import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {


  bannerImageUrl = '/img/brasao-igreja.png';

  isMobile = window.innerWidth <= 768;

  activeDropdown: number | null = null;


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    // Se o clique não for em nenhum elemento do menu, fecha
    if (!target.closest('.main-nav')) {
      this.activeDropdown = null;
      this.isMobileMenuOpen = false;
    }
  }


  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen = false;
      this.activeDropdown = null;
    }
  }


  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleDropdown(index: number, event: Event) {
    event.preventDefault();
    this.activeDropdown = this.activeDropdown === index ? null : index;
  }

  closeMenu() {
    this.isMobileMenuOpen = false;
    this.activeDropdown = null;
  }


}
