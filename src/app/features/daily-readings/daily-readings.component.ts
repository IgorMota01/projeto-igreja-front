import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-daily-readings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './daily-readings.component.html',
  styleUrls: ['./daily-readings.component.scss'],
  providers: [DatePipe]
})
export class DailyReadingsComponent implements OnInit {
  currentDate: string;
  isLoading: boolean = true;
  errorMessage: string = '';
  
  liturgiaData: any = {
    data: '',
    titulo: '',
    primeiraLeitura: '',
    salmoReferencia: '',
    evangelhoReferencia: ''
  };

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router
  ) {
    this.currentDate = this.datePipe.transform(new Date(), 'dd-MM-yyyy') || '';
  }

  ngOnInit(): void {
    this.loadReadings();
  }

  loadReadings() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.http.get(`http://localhost:8080/api/liturgia/resumida/hoje`)
      .subscribe({
        next: (response: any) => {
          console.log('Dados recebidos:', response);
          this.liturgiaData = response;
          if (response.data) {
            this.currentDate = response.data;
          }
        },
        error: (err) => {
          console.error('Erro ao carregar leituras:', err);
          this.errorMessage = 'Não foi possível carregar as leituras.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  getFormattedDate(): string {
  return this.datePipe.transform(this.currentDate, 'fullDate', 'pt-BR') || '';
}
  
  navigateToDetails() {
    const dateStr = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    if (dateStr) {
      this.router.navigate(['/liturgia/detalhes', dateStr]);
    }
  }
}