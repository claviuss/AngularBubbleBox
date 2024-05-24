import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from "@angular/common";
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { IframeEvent, MoonPhasePayload, MoonPhaseReqPayload, isMoonPhaseEvent, isMoonPhaseLoaderEvent } from '../../types/bubble-box-event';
import { BubbleBoxDirective } from '../../directives/bubble-box.directive';

@Component({
  selector: 'app-moon-phase',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BubbleBoxDirective],
  templateUrl: './moon-phase.component.html',
  styleUrl: './moon-phase.component.scss'
})
export class MoonPhaseComponent {
  message$ = new Subject<MoonPhaseReqPayload | MoonPhasePayload>();

  moonPhaseForm: FormGroup;

  moonPhaseData: MoonPhasePayload | undefined;

  loading: boolean = false
  constructor(private fb: FormBuilder) {
    this.moonPhaseForm = this.fb.group({
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'),
      name: '',
      message: ''
    })
  }

  onSubmit() {
    this.loading = true;
    this.message$.next(this.moonPhaseForm.value);
  }


  onIframeEvent(event: MessageEvent<IframeEvent>) {
    console.log("event", event.data)
    if (isMoonPhaseEvent(event.data)) {
      this.moonPhaseForm.reset();
      this.moonPhaseData = event.data.payload;
    }

    if (isMoonPhaseLoaderEvent(event.data)) {
      this.loading = event.data.payload.loading;
    }
  }


}
