import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LayoutComponent } from "../../shared/layout/layout.component";

interface Community {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, LayoutComponent],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommunityComponent implements OnInit {
  communities: Community[] = []; // Renomeado para um nome mais genérico
  isLoading = true;
  error: string | null = null;
  usingFallbackData = false; // Nova flag para indicar que está usando dados locais

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCommunities();
  }

  loadCommunities(): void {
    this.isLoading = true;
    this.error = null;
    this.usingFallbackData = false;
    
    this.http.get<Community[]>('api/communities')
      .pipe(
        catchError(() => {
          // Em caso de erro, retorna os dados locais
          this.usingFallbackData = true;
          return of(this.getFallbackCommunities());
        })
      )
      .subscribe({
        next: (data) => {
          this.communities = data;
          this.isLoading = false;
        },
        error: (err) => {
          // Este bloco só será executado se o catchError não lidar com o erro
          this.error = 'Erro ao carregar comunidades. Mostrando dados locais.';
          this.communities = this.getFallbackCommunities();
          this.usingFallbackData = true;
          this.isLoading = false;
        }
      });
  }

  private getFallbackCommunities(): Community[] {
    return [
      {
        id: 1,
        name: 'São Domingos',
        description: 'Comunidade do Sítio tal',
        imageUrl: '/img/pe_sucessao.PNG'
      },
      {
        id: 2,
        name: 'Comunidade São Pedro',
        description: 'Grupo de jovens da comunidade São Pedro',
        imageUrl: '/img/pe_ordenacao.PNG'
      },
      // Adicione mais comunidades locais se necessário
      {
        id: 3,
        name: 'Comunidade Nossa Senhora Aparecida',
        description: 'Grupo de oração e atividades sociais',
        imageUrl: '/img/default-community.jpg'
      }
    ];
  }

  getCommunityDetails(id: number): Observable<Community> {
    if (this.usingFallbackData) {
      // Se estiver usando dados locais, retorna do array local
      const community = this.communities.find(c => c.id === id);
      return community ? of(community) : throwError('Comunidade não encontrada');
    }
    return this.http.get<Community>(`api/communities/${id}`);
  }
}