import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isCollapsed = false;
  isMobileOpen = false;
  activeItem = 'dashboard';

  @Output() sidebarCollapsed = new EventEmitter<boolean>();

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarCollapsed.emit(this.isCollapsed);
  }

  setActiveItem(item: string) {
    this.activeItem = item;
    event?.preventDefault();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isClickInsideSidebar = this.elementRef.nativeElement.contains(target);
    const isMobile = window.innerWidth <= 992;

    if (!isClickInsideSidebar && isMobile && this.isMobileOpen) {
      this.isMobileOpen = false;
    }
  }

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 992) {
      this.isMobileOpen = false;
    }
  }
}
