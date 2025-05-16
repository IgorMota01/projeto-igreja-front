import { CommonModule } from '@angular/common';
import { Component, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  currentSlide = 0;
  intervalId: any;

  goToLink(link: string): void {
    window.open(link); // Abre em nova aba (opcional)

  }


  slides = [
    { 
      image: '/img/noticia1.jpg', 
      link: '/noticias/1', 
      title: 'Brasão da Igreja', 
      summary: "Clique para ver a descrição completa",
      date: '05/05/25 às 14:57'
    },
    {
      image: '/img/pe_roberto.PNG',
      link: '/noticias/2',
      title: 'Padre Roberto',
      summary: "Conheça nosso pároco e sua trajetória",
      date: '05/05/25 às 14:57'
    },
    {
      image: '/img/vicenteferrer.jpg',
      link: '/noticias/3',
      title: 'São Vicente Ferrer',
      summary: "Conheça o nosso padroeiro e sua história",
      date: '05/05/25 às 14:57'
    }
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 30000);
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}