import { Routes } from '@angular/router';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CardsEditComponent } from './cards-edit/cards-edit.component';

export const CARDS_ROUTES: Routes = [
    {
      path: '',
      data: {
        title: 'Mis listas',
      },
      component: CardsListComponent,
    },
    {
      path: 'create',
      data: {
        title: 'Crear',
      },
      component: CardsEditComponent,
    },
    {
      path: ':id',
      data: {
        title: 'Visualizar',
      },
      component: CardsEditComponent,
    },
    {
      path: ':id/edit',
      data: {
        title: 'Editar',
      },
      component: CardsEditComponent,
    },
];
