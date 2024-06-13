import { Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsEditComponent } from './posts-edit/posts-edit.component';
import { getByIdResolver }  from './get-by-id.resolver';
import { createResolver } from './create.resolver';

export const POSTS_ROUTES: Routes = [
    {
      path: '',
      data: {
        title: 'Mis listas',
      },
      component: PostsListComponent,
    },
    {
      path: 'create',
      data: {
        title: 'Crear',
      },
      resolve: {
        entity: createResolver
      },
      component: PostsEditComponent,
    },
    {
      path: ':id',
      data: {
        title: 'Visualizar',
      },
      resolve: {
        entity: getByIdResolver
      },
      component: PostsEditComponent,
    },
    {
      path: ':id/edit',
      data: {
        title: 'Editar',
      },
      resolve: {
        entity: getByIdResolver
      },
      component: PostsEditComponent,
    },
];
