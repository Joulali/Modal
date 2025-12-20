import { trigger, state, style, animate, transition } from '@angular/animations';

export const MODAL_ANIMATION = trigger('modalAnimation', [
  state('show', style({
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  })),
  state('hide', style({
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.9)',
  })),
  transition('hide => show', animate('0.25s ease-in')),
  transition('show => hide', animate('0.3s ease-out')),
]);

export const BACKDROP_ANIMATION = trigger('backdropAnimation', [
  state('show', style({ opacity: 1 })),
  state('hide', style({ opacity: 0 })),
  transition('hide => show', animate('0.25s ease-in')),
  transition('show => hide', animate('0.25s ease-out')),
]);
