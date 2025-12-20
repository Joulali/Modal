import { TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { FormGroupDirective } from '@angular/forms';
import { Modal } from './modal.model';

describe('ModalService', () => {
  let service: ModalService;

  const createModal = (id: string): jasmine.SpyObj<Modal> => {
    return jasmine.createSpyObj<Modal>('Modal', ['open', 'close'], { id });
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService],
    });

    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a modal', () => {
    const modal = createModal('test');

    service.add(modal);

    service.open('test');
    expect(modal.open).toHaveBeenCalled();
  });

  it('should remove a modal by id', () => {
    const modal = createModal('test');

    service.add(modal);
    service.remove('test');

    service.open('test');
    expect(modal.open).not.toHaveBeenCalled();
  });

  it('should open a modal by id', () => {
    const modal = createModal('modal-1');

    service.add(modal);
    service.open('modal-1');

    expect(modal.open).toHaveBeenCalledTimes(1);
  });

  it('should close a modal by id', () => {
    const modal = createModal('modal-2');

    service.add(modal);
    service.close('modal-2');

    expect(modal.close).toHaveBeenCalledTimes(1);
  });

  it('should reset form when closing modal with FormGroupDirective', () => {
    const modal = createModal('modal-3');

    const formDirective = jasmine.createSpyObj<FormGroupDirective>(
      'FormGroupDirective',
      ['resetForm']
    );

    const formData = { name: 'test' };

    service.add(modal);
    service.close('modal-3', formDirective, formData);

    expect(modal.close).toHaveBeenCalled();
    expect(formDirective.resetForm).toHaveBeenCalledWith(formData);
  });

  it('should not throw if modal does not exist', () => {
    expect(() => service.open('unknown')).not.toThrow();
    expect(() => service.close('unknown')).not.toThrow();
  });
});
