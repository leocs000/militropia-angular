import { Routes } from '@angular/router';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { estadoResolver } from './components/estado/resolver/estado.resolver';
import { MunicipioFormComponent } from './components/municipio/municipio-form/municipio-form.component';
import { MunicipioListComponent } from './components/municipio/municipio-list/municipio-list.component';
import { municipioResolver } from './components/municipio/resolver/municipio.resolver';
import { ArmaListComponent } from './components/arma/arma-list/arma-list.component';

export const routes: Routes = [
    {path: '', redirectTo: '/armas', pathMatch: 'full'},

    {path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
    {path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado'},
    {path: 'estados/edit/:id', component: EstadoFormComponent, resolve: {estado: estadoResolver}},

    {path: 'municipios', component: MunicipioListComponent, title: 'Lista de municipios'},
    {path: 'municipios/new', component: MunicipioFormComponent, title: 'Novo municipio'},
    {path: 'municipios/edit/:id', component: MunicipioFormComponent, resolve: {municipio: municipioResolver}},
    
    {path: 'armas', component: ArmaListComponent, title: 'Lista de Armas'},
//    {path: 'municipios/new', component: MunicipioFormComponent, title: 'Novo municipio'},
//    {path: 'municipios/edit/:id', component: MunicipioFormComponent, resolve: {municipio: municipioResolver}},
];
