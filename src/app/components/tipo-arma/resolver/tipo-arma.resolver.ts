import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { TipoArma } from '../../../models/tipo-arma.model';
import { inject } from '@angular/core';
import { TipoArmaService } from '../../../services/tipo-arma.service';

export const tipoArmaResolver: ResolveFn<TipoArma> = 
(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(TipoArmaService).findById(route.paramMap.get('id')!);
};
