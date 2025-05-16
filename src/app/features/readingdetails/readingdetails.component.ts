import { LayoutComponent } from "../../shared/layout/layout.component";
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-readingdetails',
  standalone: true,
  imports: [CommonModule, FormsModule, LayoutComponent],
  templateUrl: './readingdetails.component.html',
  styleUrls: ['./readingdetails.component.scss'],
  providers: [DatePipe]
})
export class ReadingdetailsComponent implements OnInit {
  isLoading: boolean = true;
  errorMessage: string = '';
  isExpanded: { [key: string]: boolean } = {};
  showCalendar: boolean = false;

  currentSection: string = 'oracoes';
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  liturgiaData: any = {
    data: '',
    titulo: '',
    cor: '',
    oracoes: null,
    primeiraLeitura: null,
    salmo: null,
    evangelho: null,
    antifonas: null
  };

  currentMonth: Date;
  calendarDays: any[] = [];
  weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  selectedDate: string;
  currentDate: string;

  currentAudio: { url: string, type: string, title: string } | null = null;
  audioSources = {
    oracoes: '',
    primeiraLeitura: '',
    salmo: '',
    evangelho: '',
    antifonas: ''
  };

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute
  ) {
    const today = new Date();
    this.currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    this.currentDate = this.formatDate(today);
    this.selectedDate = this.currentDate;
  }

  ngOnInit(): void {
    this.generateCalendar();
    this.route.paramMap.subscribe((params: { get: (arg0: string) => any; }) => {
      const dateParam = params.get('date');
      if (dateParam) {
        this.currentDate = dateParam;
        this.selectedDate = dateParam;
        const date = new Date(dateParam);
        this.currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        this.generateCalendar();
      }
      this.loadLiturgiaCompleta();
    });
  }

  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || date.toISOString().split('T')[0];
  }

  generateCalendar(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    this.calendarDays = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < startingDay; i++) {
      this.calendarDays.push({
        day: prevMonthLastDay - startingDay + i + 1,
        date: '',
        enabled: false,
        hasLiturgy: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      this.calendarDays.push({
        day: i,
        date: dateStr,
        enabled: true,
        hasLiturgy: true
      });
    }

    const totalCells = 42;
    const remainingDays = totalCells - (startingDay + daysInMonth);
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDays.push({
        day: i,
        date: '',
        enabled: false,
        hasLiturgy: false
      });
    }
  }

  previousMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateCalendar();
  }

  selectDate(date: string): void {
    if (date && date !== this.selectedDate) {
      this.selectedDate = date;
      this.currentDate = date;
      this.router.navigate(['liturgia/detalhes', date]);
      this.showCalendar = false;
    }
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar;
  }

  playAudio(section: string): void {
    if (!this.liturgiaData[section]) return;

    this.currentAudio = {
      url: `http://localhost:8080/api/audio/${this.currentDate}/${section}`,
      type: 'audio/mpeg',
      title: `${section} - ${this.liturgiaData.titulo}`
    };

    setTimeout(() => {
      if (this.audioPlayer?.nativeElement) {
        this.audioPlayer.nativeElement.load();
        this.audioPlayer.nativeElement.play().catch(e => {
          console.error('Erro ao reproduzir áudio:', e);
          this.errorMessage = 'Não foi possível reproduzir o áudio.';
        });
      }
    }, 100);
  }

  loadLiturgiaCompleta() {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get(`http://localhost:8080/api/liturgia/completa/${this.currentDate}`)
      .subscribe({
        next: (response: any) => {
          this.liturgiaData = response || {};

          if (this.liturgiaData.oracoes) {
            this.currentSection = 'oracoes';
          } else if (this.liturgiaData.primeiraLeitura) {
            this.currentSection = 'primeiraLeitura';
          } else if (this.liturgiaData.salmo) {
            this.currentSection = 'salmo';
          } else if (this.liturgiaData.evangelho) {
            this.currentSection = 'evangelho';
          } else if (this.liturgiaData.antifonas) {
            this.currentSection = 'antifonas';
          }

          this.checkAudioAvailability();
        },
        error: (err) => {
          console.error('Erro ao carregar liturgia:', err);
          this.errorMessage = 'Não foi possível carregar a liturgia para esta data.';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  private checkAudioAvailability(): void {
    const sections = ['oracoes', 'primeiraLeitura', 'salmo', 'evangelho', 'antifonas'];
    sections.forEach(section => {
      if (this.liturgiaData[section]) {
        if (section in this.audioSources) {
          this.audioSources[section as keyof typeof this.audioSources] = `http://localhost:8080/api/audio/${this.currentDate}/${section}`;
        }
      }
    });
  }
  getFormattedDate(): string {
    return this.datePipe.transform(this.currentDate, 'fullDate') || '';
  }

  toggleExpand(section: string): void {
    this.isExpanded[section] = !this.isExpanded[section];
  }

  formatarTextoComVersiculos(texto: string): string {
    if (!texto) return '';
    return texto.replace(/(\d+)/g, '<sup>$1</sup>');
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}