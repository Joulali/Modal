import { Component, inject } from '@angular/core';
import { ThemeName, ThemeService } from '../../theme.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../modal/modal.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-main-content',
  imports: [ModalComponent,],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {
  private themeService = inject(ThemeService);
  currentTheme: ThemeName = 'default';
  isDarkMode = false;
  private themeSubscription: Subscription;

  private modalService = inject(ModalService);

  openModal(modal_id: string): void {
    this.modalService.open(modal_id);
  }

  closeModal(id: string): void {
    this.modalService.close(id);
  }

  constructor() {
    this.themeSubscription = this.themeService.themeChanges$.subscribe(
      (theme) => {
        this.currentTheme = theme;
        this.isDarkMode = theme === 'dark';
        console.log('Theme updated to:', theme);
      }
    );
  }

  ngOnInit() {
    // Initialize with current theme
    this.currentTheme = this.themeService.theme;
    this.isDarkMode = this.themeService.isDarkTheme;

    // Log initial state
    console.log('App initialized with theme:', this.currentTheme);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  setTheme(theme: ThemeName): void {
    this.themeService.theme = theme;
  }

  ngOnDestroy() {
    // Clean up subscription
    this.themeSubscription.unsubscribe();
  }
}
