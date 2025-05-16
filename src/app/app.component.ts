import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'church';

  ngOnInit(): void {
    const theme = this.detectLiturgicalSeason();
    //const theme = 'tempo-advento';
    document.documentElement.className = theme;
  }

  detectLiturgicalSeason(): string {
    const today = new Date();
    const year = today.getFullYear();

    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    const easter = new Date(year, month - 1, day);

    const ashWednesday = new Date(easter);
    ashWednesday.setDate(easter.getDate() - 46);

    const pentecost = new Date(easter);
    pentecost.setDate(easter.getDate() + 49);

    const christmas = new Date(year, 11, 25);
    const epiphany = new Date(year, 0, 6);

    const baptism = new Date(epiphany);
    while (baptism.getDay() !== 0) baptism.setDate(baptism.getDate() + 1);

    const advent = new Date(christmas);
    advent.setDate(advent.getDate() - 21);
    while (advent.getDay() !== 0) advent.setDate(advent.getDate() - 1);

    const easterOctaveEnd = new Date(easter);
    easterOctaveEnd.setDate(easter.getDate() + 8);

    if (today >= advent && today < christmas) return 'tempo-advento';
    if (today >= christmas && today < baptism) return 'tempo-natal';
    if (today >= baptism && today < ashWednesday) return 'tempo-comum';
    if (today >= ashWednesday && today < easter) return 'tempo-quaresma';
    if (today >= easter && today < easterOctaveEnd) return 'oitava-pascoa';
    if (today >= easterOctaveEnd && today < pentecost) return 'tempo-pascoa';
    if (today >= pentecost && today < advent) return 'tempo-comum';

    return 'tempo-comum';
  }

}
