import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  searchQuery = '';

  @Output() toggleSidebar = new EventEmitter<void>();

  toggleMobileMenu() {
    this.toggleSidebar.emit();
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
    // Implement search functionality here
  }

  toggleNotifications() {
    console.log('Toggle notifications');
    // Implement notification functionality here
  }
}
