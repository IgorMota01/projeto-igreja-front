import { Component } from '@angular/core';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { CarouselComponent } from "../../shared/carousel/carousel.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DailyReadingsComponent } from '../daily-readings/daily-readings.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutComponent, CommonModule, CarouselComponent, RouterModule, DailyReadingsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isHomePage = true; // Definindo a propriedade que estava faltando
  
  // Dados de exemplo para as seções
  upcomingEvents = [
    { day: '15', month: 'MAI', title: 'Missa Solene', time: '19:00', location: 'Igreja Matriz' },
    { day: '20', month: 'MAI', title: 'Grupo de Oração', time: '20:00', location: 'Salão Paroquial' }
  ];

  galleryPhotos = [
    { url: '/img/noticia1.jpg', caption: 'Festa da Padroeira' },
    { url: '/img/noticia2.jpeg', caption: 'Retiro Espiritual' }
  ];
}