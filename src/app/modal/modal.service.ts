import { Injectable } from '@angular/core';
import { Modal } from './modal.model';
import { FormGroupDirective } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals: Modal[] = [];

  add(modal: Modal): void {
    this.modals.push(modal);
  }

  remove(id: string): void {
    this.modals = this.modals.filter((m) => m.id !== id);
  }

  open(id: string): void {
    this.modals.find((m) => m.id === id)?.open();
  }

  close(
    id: string,
    fd?: FormGroupDirective,
    form?: Record<string, unknown>
  ): void {
    const modal = this.modals.find((m) => m.id === id);
    if (modal) {
      modal.close();
      if (fd) fd.resetForm(form);
    }
  }
}
