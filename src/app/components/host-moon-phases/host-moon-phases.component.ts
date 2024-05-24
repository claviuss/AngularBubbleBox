import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BubbleBoxDirective } from '../../directives/bubble-box.directive';
import { Subject } from 'rxjs';
import { IframeEvent, MoonPhaseLoaderPayload, MoonPhasePayload, MoonPhaseReqPayload, isMoonPhaseReqEvent } from '../../types/bubble-box-event';


@Component({
  selector: 'app-host-moon-phases',
  standalone: true,
  imports: [CommonModule, BubbleBoxDirective],
  templateUrl: './host-moon-phases.component.html',
  styleUrl: './host-moon-phases.component.scss'
})
export class HostMoonPhasesComponent {

  messagesToChildApp: any[] = [];
  messagesToHostApp: any[] = [];

  message$ = new Subject<MoonPhasePayload | MoonPhaseLoaderPayload>();

  moonPhases: MoonPhasePayload[] = [
    {
      id: 1,
      title: `New Moon`,
      description: `The new moon phase marks the beginning of the lunar cycle, when the moon is not visible from Earth as it sits between the Earth and the Sun. It symbolizes new beginnings, fresh starts, and the potential for growth. It's a time for setting intentions, planting seeds of future goals, and embracing opportunities for change.`,
      icon: 'assets/moon-phase/1-icon.svg',
      picture: 'assets/moon-phase/1.svg'
    },
    {
      id: 2,
      title: `Waxing Crescent`,
      description: `Following the new moon, a small sliver of light becomes visible on the right side of the moon, marking the waxing crescent phase. This phase represents growth, progress, and expansion. It's a time for taking action on the intentions set during the new moon, building momentum, and moving forward with determination.`,
      icon: 'assets/moon-phase/2-icon.svg',
      picture: 'assets/moon-phase/2.svg'
    },
    {
      id: 3,
      title: `First Quarter`,
      description: `At the first quarter, half of the moon's face is illuminated, creating a perfect right angle between the Earth, the moon, and the Sun. This phase symbolizes decision-making, overcoming obstacles, and finding balance. It's a time for evaluating progress, making adjustments as needed, and staying focused on goals despite challenges.`,
      icon: 'assets/moon-phase/3-icon.svg',
      picture: 'assets/moon-phase/3.svg'
    },
    {
      id: 4,
      title: `Waxing Gibbous`,
      description: `Continuing to wax, more of the moon's surface becomes illuminated, leading to the waxing gibbous phase. This phase signifies refinement, preparation, and readiness for culmination. It's a time for fine-tuning plans, gathering resources, and staying committed to the path forward.`,
      icon: 'assets/moon-phase/4-icon.svg',
      picture: 'assets/moon-phase/4.svg'
    },
    {
      id: 5,
      title: `Full Moon`,
      description: `The full moon phase occurs when the Earth is directly between the Sun and the moon, causing the moon to appear fully illuminated from Earth's perspective. This phase symbolizes completion, manifestation, and illumination. It's a time for celebrating achievements, expressing gratitude, and embracing the abundance of life.`,
      icon: 'assets/moon-phase/5-icon.svg',
      picture: 'assets/moon-phase/5.svg'
    }
  ]

  hostAppDataMessages: IframeEvent[] = [];
  childAppDataMessages: IframeEvent[] = [];


  onIframeEvent(event: MessageEvent<IframeEvent>) {
    this.messagesToHostApp.push(event.data.payload);

    if (isMoonPhaseReqEvent(event.data)) {
      setTimeout(() => {
        this.messagesToChildApp.push({ loading: false });
        this.message$.next({ loading: false });
      }, 5000);
    }
  }

  selectMoonPhase(data: MoonPhasePayload) {
    this.messagesToChildApp.push(data);
    this.message$.next(data);
  }
}