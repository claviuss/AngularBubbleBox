import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, fromEvent, merge, takeUntil, tap } from 'rxjs';
import { HydratedGenericBubbleBoxEvent, IframeEvent, isGenericBubbleBoxEvent } from '../types/bubble-box-event';
import { environment } from '../../environments/environment.development';



@Directive({
  selector: '[bubbleBox]',
  standalone: true
})
export class BubbleBoxDirective implements OnChanges, OnDestroy {
  @Input() message: object | Observable<object> | null = null;
  @Output() iframeEvent = new EventEmitter<MessageEvent<IframeEvent>>();

  private _isHost = new BehaviorSubject<boolean>(true);
  private eventBus$?: Observable<MessageEvent<IframeEvent>>;
  private destroyed$ = new Subject<void>();
  private readonly _windowRef: (Window & typeof globalThis) | null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly _elementRef: ElementRef

  ) {
    this._windowRef = this.document.defaultView;
    if (!this._windowRef) {
      return;
    }
    const loaded$ = fromEvent(this._windowRef, 'load') as Observable<MessageEvent<IframeEvent>>;
    this.eventBus$ = merge(fromEvent<MessageEvent<IframeEvent>>(this._windowRef, 'message'), loaded$);

    this._isHost.next(this._windowRef === this._windowRef.parent);



    this.eventBus$
      ?.pipe(
        filter((evt: MessageEvent) => evt.data), // remove empty events
        filter(({ origin }) => {
          if (!this.isIFrame(this._elementRef.nativeElement)) {
            // if element is not iframe then event coming from parent
            return true;
          }
          // if element is iframe make sure its from 'this' iframe
          return origin === this.getOrigin(this._elementRef.nativeElement?.src);
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe((event: MessageEvent<IframeEvent>) => {
        this.iframeEvent.emit(event); // handle child event
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message) {
      if (this.message instanceof Observable) {
        this.message.pipe(takeUntil(this.destroyed$), tap(console.warn)).subscribe((message: object) => {
          this.notify(message, this._elementRef.nativeElement); // send message out
        });
      } else {
        this.notify(this.message as any, this._elementRef.nativeElement); // send message out
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }


  isHost() {
    return this._isHost.getValue();
  }

  isChildWindow(): boolean {
    return this._windowRef?.opener ?? false;
  }


  isIFrame(nativeElement: HTMLIFrameElement): boolean {
    return nativeElement?.tagName?.localeCompare('iframe', undefined, { sensitivity: 'accent' }) === 0;
  }

  getOrigin(url: string): string {
    let origin;
    if (!url) {
      origin = '*';
    } else {
      try {
        origin = new URL(url)?.origin ?? '*';
      } catch (e) {
        origin = '*';
      }
    }
    return origin;
  }

  notify(message: any, childNativeElement?: HTMLIFrameElement) {
    let hydratedMessage: HydratedGenericBubbleBoxEvent;
    if (isGenericBubbleBoxEvent(message)) {
      hydratedMessage = {
        ...message
      } as HydratedGenericBubbleBoxEvent;
    } else {
      hydratedMessage = {
        eventType: 'topic',
        topic: 'default',
        targetAudience: 'component-internal',
        category: 'default',
        compatibility_mode: 'compatible',
        payload: {
          ...message
        }
      } as HydratedGenericBubbleBoxEvent;
    }
    hydratedMessage = {
      ...hydratedMessage,
      owningApplication: environment.appName,
      createdAt: new Date()
    };

    if (!childNativeElement || !this.isIFrame(childNativeElement)) {
      // notify parent
      if (!this._windowRef?.parent || this.isHost()) {
        return;
      }
      const origin = this.getOrigin(this.document.referrer);
      this._windowRef.parent.postMessage(hydratedMessage, origin);
    } else {
      // notify child
      const { origin } = new URL(childNativeElement.src);
      childNativeElement.contentWindow?.postMessage(hydratedMessage, origin);
    }
  }
}
