import { trigger, state, style, animate, transition } from '@angular/animations';

export const MODAL_ANIMATION = trigger('modalAnimation', [
  state(
    'hide',
    style({
      opacity: 0,
      transform: '{{ hideTransform }}',
    }),
    { params: { hideTransform: 'translate(-50%, -50%) scale(0.9)' } }
  ),
  state(
    'show',
    style({
      opacity: 1,
      transform: '{{ showTransform }}',
    }),
    { params: { showTransform: 'translate(-50%, -50%) scale(1)' } }
  ),
  transition('hide => show', animate('250ms ease-out')),
  transition('show => hide', animate('200ms ease-in')),
]);

export const BACKDROP_ANIMATION = trigger('backdropAnimation', [
  state('hide', style({ opacity: 0 })),
  state('show', style({ opacity: 1 })),
  transition('hide <=> show', animate('200ms')),
]);
