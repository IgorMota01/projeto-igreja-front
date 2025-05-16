import { Component } from '@angular/core';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { CommonModule } from '@angular/common';

interface Priest {
  id: string;
  name: string;
  imageUrl: string;
  period: string;
  isCurrent?: boolean;
}

@Component({
  selector: 'app-priest',
  standalone: true,
  imports: [LayoutComponent, CommonModule],
  templateUrl: './priest.component.html',
  styleUrl: './priest.component.scss'
})
export class PriestComponent {
  priests: Priest[] = [
    {
      id: '1',
      name: 'Pe. Roberto Gomes',
      imageUrl: '/img/pe_sucessao.PNG',
      period: '2024 - Atual',
      isCurrent: true
    },
    {
      id: '2',
      name: 'Pe. Joselino',
      imageUrl: '/img/priests/pe_joselino.jpg',
      period: '2022 - 2024'
    },
    {
      id: '3',
      name: 'Pe. Fernando Jacinto',
      imageUrl: '/img/priests/pe_fernando.jpg',
      period: '2005 - 2010'
    },
    {
      id: '4',
      name: 'Pe. José Hermes',
      imageUrl: '/img/priests/pe_hermes.jpg',
      period: '2000 - 2005'
    },
    {
      id: '5',
      name: 'Pe. Marcos Ribeiro',
      imageUrl: '/assets/images/priests/pe-marcos.jpg',
      period: '1995 - 2000'
    },
    {
      id: '6',
      name: 'Pe. Carlos Andrade',
      imageUrl: '/assets/images/priests/pe-carlos.jpg',
      period: '1990 - 1995'
    }
  ];

  get currentPriest(): Priest | undefined {
    return this.priests.find(priest => priest.isCurrent);
  }

  get formerPriests(): Priest[] {
    return this.priests.filter(priest => !priest.isCurrent);
  }
}