import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationEvent } from '@angular/animations';

import { ModalService } from './modal.service';
import { BACKDROP_ANIMATION, MODAL_ANIMATION } from './modal.animations';

@Component({
  standalone: true,
  selector: 'app-modal',
  imports: [CommonModule],
  template: `
    <div
      class="pop-modal {{ size }} {{ position }}"
      [@modalAnimation]="{
        value: state,
        params: animationParams
      }"
      (@modalAnimation.done)="onAnimationDone($event)"
    >
      <!-- Header -->
      <ng-container *ngIf="headerTemplate; else defaultHeader">
        <div class="pop-modal-header">
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
        </div>
      </ng-container>

      <ng-template #defaultHeader>
        <div class="pop-modal-header" *ngIf="title || showCloseButton">
          <h3>{{ title }}</h3>
          <button
            *ngIf="showCloseButton"
            class="pop-modal-close"
            (click)="close()"
          >
            &times;
          </button>
        </div>
      </ng-template>

      <!-- Body -->
      <div class="pop-modal-body">
        <ng-content></ng-content>
      </div>

      <!-- Footer -->
      <ng-container *ngIf="footerTemplate; else defaultFooter">
        <div class="pop-modal-footer">
          <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
        </div>
      </ng-container>

      <ng-template #defaultFooter>
        <div class="pop-modal-footer" *ngIf="showFooter">
          <button class="btn btn-secondary" (click)="close()">Close</button>
        </div>
      </ng-template>
    </div>

    <!-- Backdrop -->
    <div
      class="pop-modal-background"
      [@backdropAnimation]="state"
      (click)="closeOnBackdropClick ? close() : null"
    ></div>
  `,
  animations: [MODAL_ANIMATION, BACKDROP_ANIMATION],
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input({ required: true }) id!: string;
  @Input() size: 'small' | 'large' | 'extra-large' = 'large';
  @Input() position: 'center' | 'left' | 'right' = 'center';

  @Input() title?: string;
  @Input() showCloseButton = true;
  @Input() showFooter = false;
  @Input() closeOnBackdropClick = true;

  @ContentChild('modalHeader') headerTemplate?: TemplateRef<any>;
  @ContentChild('modalFooter') footerTemplate?: TemplateRef<any>;

  state: 'show' | 'hide' = 'hide';
  private isClosing = false;
  private readonly ANIMATION_PARAMS = {
    left: {
      hideTransform: 'translateX(-100%)',
      showTransform: 'translateX(0)',
    },
    right: {
      hideTransform: 'translateX(100%)',
      showTransform: 'translateX(0)',
    },
    center: {
      hideTransform: 'translate(-50%, -50%) scale(0.9)',
      showTransform: 'translate(-50%, -50%) scale(1)',
    },
  } as const;

  private modalService = inject(ModalService);
  private el = inject(ElementRef<HTMLElement>);

  private element = this.el.nativeElement;

  ngOnInit(): void {
    if (!this.id) {
      console.error('Modal must have an id');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.pop-modal') === this.element) {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('pop-modal-open');
    this.state = 'show';
  }

  close(): void {
    this.state = 'hide';
    this.isClosing = true;
    document.body.classList.remove('pop-modal-open');
  }

  onAnimationDone(event: AnimationEvent): void {
    if (this.isClosing && event.toState.includes('hide')) {
      this.element.style.display = 'none';
      this.isClosing = false;
    }
  }

  get animationParams() {
    return (
      this.ANIMATION_PARAMS[
        this.position as keyof typeof this.ANIMATION_PARAMS
      ] ?? this.ANIMATION_PARAMS.center
    );
  }
}
