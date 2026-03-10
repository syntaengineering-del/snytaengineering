import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isScrolled = false;
  menuActive = false;
  openSubmenu: string | null = null;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
    if (!this.menuActive) {
      this.openSubmenu = null;
    }
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.menuActive ? 'hidden' : '';
  }

  toggleSubmenu(name: string) {
    this.openSubmenu = this.openSubmenu === name ? null : name;
  }
}
