import { Routes } from '@angular/router';
import { PostsListComponent } from './posts-list/posts-list.component';
import { PostsEditComponent } from './posts-edit/posts-edit.component';
import { getById as GetPostByIdResolver }  from './get-by-id.resolver';

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
      component: PostsEditComponent,
    },
    {
      path: ':id',
      data: {
        title: 'Visualizar',
      },
      resolve: {
        entity: GetPostByIdResolver
      },
      component: PostsEditComponent,
    },
    {
      path: ':id/edit',
      data: {
        title: 'Editar',
      },
      resolve: {
        entity: GetPostByIdResolver
      },
      component: PostsEditComponent,
    },
];
