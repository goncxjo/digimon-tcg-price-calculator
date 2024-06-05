import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OldHomeComponent } from './components/home_old/home_old.component';

export const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Inicio',
      },
      component: HomeComponent,
    },
    {
      path: 'old',
      data: {
        title: 'Inicio',
      },
      component: OldHomeComponent,
    }
];
  
