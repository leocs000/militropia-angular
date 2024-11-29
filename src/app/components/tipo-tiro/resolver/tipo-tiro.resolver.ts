import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TipoTiro } from '../../../models/tipo-tiro.model';
import { inject } from '@angular/core';
import { TipoTiroService } from '../../../services/tipo-tiro.service';

export const tipoTiroResolver: ResolveFn<TipoTiro> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(TipoTiroService).findById(route.paramMap.get('id')!);
};
