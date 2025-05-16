import { CommonModule } from "@angular/common";
import { LayoutComponent } from "../../shared/layout/layout.component";
import { RouterLink } from "@angular/router";
import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, OnDestroy } from "@angular/core";

@Component({
  selector: 'app-history',
  imports: [LayoutComponent, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('gallery') galleries!: QueryList<ElementRef>;
  autoScrollIntervals: any[] = [];
  hoverStates: boolean[] = [];
  isHovering = false;
  scrollSpeed = 1;

  historySections = [
    {
      title: 'Fundação',
      content: 'A nossa história...',
      images: [
        { url: '/img/inicio_matriz.jpg', caption: 'Ano 1850' },
        { url: '/img/capela_menor.jpg', caption: 'Ano 1860' },
        { url: '/img/frente-igreja.PNG', caption: 'Ano 1870' },
        { url: '/img/noticia2.jpeg', caption: 'Ano 1880' },
        { url: '/img/noticia3.jpeg', caption: 'Ano 1890' }
      ],
      videos: ['iU_Rys4qQvM?si=kahVNGbf5QKFa30e'],
      links: [{ text: 'Saiba mais sobre o primeiro pároco', route: '/history/first-priest' }]
    }
  ];

  contributors = [
    { name: 'Fulano de Tal', role: 'Pesquisador' },
    { name: 'Ciclana Silva', role: 'Redatora' }
  ];

  getImageUrl(imagePath: string): string {
    if (imagePath.startsWith('http') || imagePath.startsWith('/img')) {
      return imagePath;
    }
    const baseUrl = 'https://api.suaigreja.com/imagens';
    return `${baseUrl}/${imagePath}`;
  }

  ngAfterViewInit() {
    this.startAutoScrollForAllGalleries();
  }

  ngOnDestroy() {
    this.stopAutoScrollForAllGalleries();
  }

  scrollGalleryLeft(index: number): void {
    const gallery = this.galleries.toArray()[index]?.nativeElement;
    if (gallery) {
      gallery.scrollBy({ left: -320, behavior: 'smooth' });
    }
  }

  scrollGalleryRight(index: number): void {
    const gallery = this.galleries.toArray()[index]?.nativeElement;
    if (gallery) {
      gallery.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }

  startAutoScrollForAllGalleries() {
    this.stopAutoScrollForAllGalleries();
    this.hoverStates = new Array(this.galleries.length).fill(false);

    this.galleries.forEach((galleryRef, index) => {
      const gallery = galleryRef.nativeElement;

      // Duplica o conteúdo para criar efeito infinito
      gallery.innerHTML += gallery.innerHTML;

      const interval = setInterval(() => {
        if (!this.hoverStates[index]) {
          gallery.scrollLeft += this.scrollSpeed;

          if (gallery.scrollLeft >= gallery.scrollWidth / 2) {
            gallery.scrollLeft = 0;
          }
        }
      }, 30);

      this.autoScrollIntervals.push(interval);
    });
  }

  stopAutoScrollForAllGalleries() {
    this.autoScrollIntervals.forEach(interval => {
      clearInterval(interval);
    });
    this.autoScrollIntervals = [];
  }

  onMouseEnter(index: number) {
    this.hoverStates[index] = true;
  }

  onMouseLeave(index: number) {
    this.hoverStates[index] = false;
  }
}