import { Component } from '@angular/core';
import { LayoutComponent } from "../../shared/layout/layout.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mass',
  imports: [LayoutComponent, CommonModule, RouterModule],
  templateUrl: './mass.component.html',
  styleUrl: './mass.component.scss'
})
export class MassComponent {
intencao(_t10: { dia: string; horarios: string[]; intencao: string; }|{ dia: string; horarios: string[]; intencao?: undefined; }) {
throw new Error('Method not implemented.');
}
  horarios = [
    { dia: 'Sábado', horarios: ['18:00 - Missa Vespertina'], intencao: 'Pela comunidade' },
    { dia: 'Domingo - Manhã', horarios: ['07:30 - Missa Tradicional', '09:00 - Missa Familiar', '10:30 - Missa Solene'] },
    { dia: 'Domingo - Tarde', horarios: ['16:00 - Missa com Catequese', '18:00 - Missa Jovem', '19:30 - Missa da Comunidade'] },
    { dia: 'Segunda-feira', horarios: ['07:00 - Missa Matinal', '19:00 - Missa da Saúde'] },
    { dia: 'Quarta-feira', horarios: ['19:00 - Missa com Novena'] }
  ];

  ultimasMissas = [
    { 
      id: 1,
      data: '15/05/2023', 
      celebrante: 'Pe. Roberto Gomes', 
      intencoes: 'Pelos enfermos da comunidade',
      fotoUrl: '/assets/missas/missa1.jpg'
    },
    // ... outras missas
  ];

}
