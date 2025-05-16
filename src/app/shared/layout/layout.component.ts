import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MassIntentionDialogComponent } from '../dialogs/mass-intention-dialog/mass-intention-dialog.component';
import { DonationDialogComponent } from '../dialogs/donation-dialog/donation-dialog.component';
import { PrayerRequestDialogComponent } from '../dialogs/prayer-request-dialog/prayer-request-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MenuComponent,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ])
    ])
  ]
})
export class LayoutComponent {


  isHomePage: boolean = false;
  showFloatingButtons: any;

  constructor(private router: Router, private dialog: MatDialog) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showFloatingButtons = !event.urlAfterRedirects.includes('/amin');
      }
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isHomePage = event.urlAfterRedirects === '/';
      });
  }

  openMassIntentions() {
    this.dialog.open(MassIntentionDialogComponent, {
      width: '400px',
      data: {} // envie dados se necessário
    });
  }

  openDonation() {
    this.dialog.open(DonationDialogComponent, {
      width: '400px',
      data: {}
    });
  }

  openPrayerRequest() {
    this.dialog.open(PrayerRequestDialogComponent, {
      width: '400px',
      data: {}
    });

  }
}
