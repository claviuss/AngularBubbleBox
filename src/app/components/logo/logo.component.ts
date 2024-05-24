import { Component } from '@angular/core';
import { BubbleBoxDirective, IframeEvent } from '../../directives/bubble-box.directive';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, BubbleBoxDirective],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  message$ = new BehaviorSubject<IframeEvent>({ type: 'message', payload: 'Hello from LogoComponent' });

  onIframeEvent(event: MessageEvent<IframeEvent>) {
    console.log('LogoComponent received event:', event);
  }

  sendMessage() {
    this.message$.next({ type: 'message', payload: 'Hello from LogoComponent'});
  }
}
