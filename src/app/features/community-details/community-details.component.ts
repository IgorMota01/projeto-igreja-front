import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Adicionei SafeResourceUrl

@Component({
  selector: 'app-community-details',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.scss']
})
export class CommunityDetailsComponent implements OnInit {
  community: any;
  videoUrl: SafeResourceUrl | undefined;

  communitiesData = [
    {
      id: 1,
      name: 'São Domingos',
      description: 'Comunidade do Sitio tal',
      history: 'Fundado em (ano)...',
      members: ['Ana Silva', 'Carlos Oliveira', 'Mariana Santos'],
      videoUrl: 'https://youtube.com/embed/exemplo1',
      meetingSchedule: 'Encontros mensais...',
      imageUrl: '/img/pe_sucessao.PNG',
      gallery: ['/img/comunidade1.jpg', '/img/comunidade2.jpg']
    },
    {
      id: 2,
      name: 'Comunidade São Pedro',
      description: 'Grupo de jovens...',
      history: 'Ativo desde (ano)...',
      members: ['João Pereira', 'Lucia Fernandes', 'Pedro Henrique'],
      videoUrl: 'https://youtube.com/embed/exemplo2',
      meetingSchedule: 'Sábados às 15h',
      imageUrl: '/img/pe_ordenacao.PNG',
      gallery: ['/img/comunidade3.jpg', '/img/comunidade4.jpg']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.community = this.communitiesData.find(c => c.id === Number(id));

    if (this.community) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.community.videoUrl);
    }
  }
}
