import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Calibre } from '../../../models/calibre.model';
import { CalibreService } from '../../../services/calibre.service';
import { inject } from '@angular/core';

export const calibreResolver: ResolveFn<Calibre> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(CalibreService).findById(route.paramMap.get('id')!);
};
