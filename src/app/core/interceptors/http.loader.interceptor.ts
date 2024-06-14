import { HttpRequest, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services';

export const httpLoaderInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loaderService = inject(LoaderService);

  if (req.url.includes('bluelytics')) {
    loaderService.hide();
  }
  else {
    loaderService.show();
  }

  return next(req).pipe(finalize(() => loaderService.hide()));
};
