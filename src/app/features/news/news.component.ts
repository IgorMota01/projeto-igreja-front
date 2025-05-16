import { Component } from '@angular/core';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [LayoutComponent, CommonModule, RouterModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss'
})
export class NewsComponent {
  noticias = [
    {
      id: 1,
      titulo: 'Festa Junina Paroquial',
      resumo: 'Venha participar da nossa tradicional festa junina',
      data: '10/06/2023',
      imagem: '/assets/noticias/festa-junina.jpg',
      categoria: 'Evento'
    },
  ];

  categorias = ['Todos', 'Evento', 'Aviso', 'Pastoral'];
  categoriaSelecionada = 'Todos';

  filtrarNoticias() {
    if (this.categoriaSelecionada === 'Todos') {
      return this.noticias;
    }
    return this.noticias.filter(n => n.categoria === this.categoriaSelecionada);
  }
}
