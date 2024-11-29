import { Routes } from '@angular/router';
import { ArmaFormComponent } from './components/arma/arma-form/arma-form.component';
import { ArmaListComponent } from './components/arma/arma-list/arma-list.component';
import { armaResolver } from './components/arma/resolver/arma.resolver';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { enderecoResolver } from './components/endereco/resolver/endereco.resolver';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { estadoResolver } from './components/estado/resolver/estado.resolver';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { funcionarioResolver } from './components/funcionario/resolver/funcionario.resolver';
import { MunicipioFormComponent } from './components/municipio/municipio-form/municipio-form.component';
import { MunicipioListComponent } from './components/municipio/municipio-list/municipio-list.component';
import { municipioResolver } from './components/municipio/resolver/municipio.resolver';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/cliente/cliente-form/cliente-form.component';
import { clienteResolver } from './components/cliente/resolver/cliente.resolver';
import { AcabamentoListComponent } from './components/acabamento/acabamento-list/acabamento-list.component';
import { acabamentoResolver } from './components/acabamento/resolver/acabamento.resolver';
import { AcabamentoFormComponent } from './components/acabamento/acabamento-form/acabamento-form.component';
import { MaterialListComponent } from './components/material/material-list/material-list.component';
import { materialResolver } from './components/material/resolver/material.resolver';
import { MaterialFormComponent } from './components/material/material-form/material-form.component';
import { TipoTiroListComponent } from './components/tipo-tiro/tipo-tiro-list/tipo-tiro-list.component';
import { tipoTiroResolver } from './components/tipo-tiro/resolver/tipo-tiro.resolver';
import { TipoTiroFormComponent } from './components/tipo-tiro/tipo-tiro-form/tipo-tiro-form.component';

export const routes: Routes = [
    {path: '', redirectTo: '/armas', pathMatch: 'full'},

    {path: 'estados', component: EstadoListComponent, title: 'Lista de Estados'},
    {path: 'estados/new', component: EstadoFormComponent, title: 'Novo Estado'},
    {path: 'estados/edit/:id', component: EstadoFormComponent, resolve: {estado: estadoResolver}},

    {path: 'municipios', component: MunicipioListComponent, title: 'Lista de municipios'},
    {path: 'municipios/new', component: MunicipioFormComponent, title: 'Novo municipio'},
    {path: 'municipios/edit/:id', component: MunicipioFormComponent, resolve: {municipio: municipioResolver}},
    
    {path: 'armas', component: ArmaListComponent, title: 'Lista de Armas'},
    {path: 'armas/new', component: ArmaFormComponent, title: 'Cadastrar Arma'},
    {path: 'armas/edit/:id', component: ArmaFormComponent, resolve: {arma: armaResolver}},

    {path: 'enderecos',component: EnderecoListComponent, title: 'Lista de Enderecos'},
    {path: 'enderecos/new',component: EnderecoFormComponent, title: 'Novo Endereco'},
    {path: 'enderecos/edit/:id',component: EnderecoFormComponent, resolve: {endereco: enderecoResolver}},
    
    {path: 'funcionarios',component: FuncionarioListComponent, title: 'Lista de Funcionarios'},
    {path: 'funcionarios/new',component: FuncionarioFormComponent, title: 'Novo Funcionario'},
    {path: 'funcionarios/edit/:id',component: FuncionarioFormComponent, resolve: {funcionario: funcionarioResolver}},

    {path: 'clientes',component: ClienteListComponent, title: 'Lista de Clientes'},
    {path: 'clientes/new',component: ClienteFormComponent, title: 'Novo Cliente'},
    {path: 'cliente/edit/:id',component: ClienteFormComponent, resolve: {cliente: clienteResolver}},

    {path: 'acabamentos',component: AcabamentoListComponent, title: 'Lista de Acabamentos'},
    {path: 'acabamentos/new',component: AcabamentoFormComponent, title: 'Novo acabamento'},
    {path: 'acabamentos/edit/:id',component: AcabamentoFormComponent, resolve: {acabamento: acabamentoResolver}},

    {path: 'materiais', component: MaterialListComponent, title: 'Lista de Materiais'},
    {path: 'materiais/new',component: MaterialFormComponent, title: 'Novo Material'},
    {path: 'materiais/edit/:id',component: MaterialFormComponent, resolve: {material: materialResolver}},

    {path: 'tipotiros', component: TipoTiroListComponent, title: 'Listagem dos Tipos de Tiros'},
    {path: 'tipotiros/new',component: TipoTiroFormComponent, title: 'Novo Tipo de Tiro'},
    {path: 'tipotiros/edit/:id',component: TipoTiroFormComponent, resolve: {tipoTiro: tipoTiroResolver}}
];
