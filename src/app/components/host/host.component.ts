import { Component } from '@angular/core';
import { BubbleBoxDirective, IframeEvent } from '../../directives/bubble-box.directive';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-host',
  standalone: true,
  imports: [CommonModule, BubbleBoxDirective],
  templateUrl: './host.component.html',
  styleUrl: './host.component.scss'
})
export class HostComponent {
  message$ = new BehaviorSubject<IframeEvent>({ type: 'message', payload: 'Hello from HostComponent' });

  onIframeEvent(event: MessageEvent<IframeEvent>) {
    console.log('HostComponent received event:', event);
  }

  sendMessage() {
    this.message$.next({ type: 'message', payload: `${new Date()}`});
  }
}
