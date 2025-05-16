import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'community', loadComponent: () => import('./features/community/community.component')
    .then(m => m.CommunityComponent) },
  { path: 'history', loadComponent: () => import('./features/history/history.component')
    .then(m => m.HistoryComponent) },
  { 
    path: 'liturgia/detalhes/:date', 
    loadComponent: () => import('./features/readingdetails/readingdetails.component')
      .then(m => m.ReadingdetailsComponent) 
  },
  { path: 'priests', loadComponent: () => import('./features/priest/priest.component')
    .then(m => m.PriestComponent) },
  { path: 'mass', loadComponent: () => import('./features/mass/mass.component')
    .then(m => m.MassComponent) },
  { path: 'news', loadComponent: () => import('./features/news/news.component')
    .then(m => m.NewsComponent) },
  { path: 'registration/catechesis', loadComponent: () => 
    import('./features/registration/catechesis/catechesis.component')
    .then(m => m.CatechesisComponent) },
  { path: '**', redirectTo: 'home' }
];
