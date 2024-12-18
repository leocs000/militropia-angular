import { Routes } from '@angular/router';
import { ArmaFormComponent } from './components/arma/arma-form/arma-form.component';
import { ArmaListComponent } from './components/arma/arma-list/arma-list.component';
import { armaResolver } from './components/arma/resolver/arma.resolver';
import { EnderecoFormComponent } from './components/endereco/endereco-form/endereco-form.component';
import { EnderecoListComponent } from './components/endereco/endereco-list/endereco-list.component';
import { enderecoResolver } from './components/endereco/resolver/endereco.resolver';
import { FuncionarioFormComponent } from './components/funcionario/funcionario-form/funcionario-form.component';
import { FuncionarioListComponent } from './components/funcionario/funcionario-list/funcionario-list.component';
import { funcionarioResolver } from './components/funcionario/resolver/funcionario.resolver';
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
import { calibreResolver } from './components/calibre/resolver/calibre.resolver';
import { CalibreListComponent } from './components/calibre/calibre-list/calibre-list.component';
import { CalibreFormComponent } from './components/calibre/calibre-form/calibre-form.component';
import { tipoArmaResolver } from './components/tipo-arma/resolver/tipo-arma.resolver';
import { TipoArmaListComponent } from './components/tipo-arma/tipo-arma-list/tipo-arma-list.component';
import { TipoArmaFormComponent } from './components/tipo-arma/tipo-arma-form/tipo-arma-form.component';
import { ArmaCardListComponent } from './components/arma/arma-card-list/arma-card-list.component';
import { CarrinhoComponent } from './components/carrinho/carrinho/carrinho.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login/login.component';
import { LoginUsuarioComponent } from './components/usuario/login-usuario/login-usuario.component';
import { CadastroUsuarioComponent } from './components/usuario/cadastro-usuario/cadastro-usuario.component';
import { FinalizarPedidoComponent } from './components/pedido/finalizar-pedido/finalizar-pedido.component';
import { PedidoFinalizadoComponent } from './components/pedido/pedido-finalizado/pedido-finalizado/pedido-finalizado.component';
import { PerfilComponent } from './components/usuario/perfil/perfil/perfil.component';
import { AlterarSenhaComponent } from './components/usuario/alterar-senha/alterar-senha/alterar-senha.component';

export const routes: Routes = [
    {path: 'tiposarma', component: TipoArmaListComponent, title: 'Listagem dos Tipos de Armas'},
    { 
        path: '', 
        component: UserTemplateComponent,
        title: 'e-commerce',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'ecommerce'},
        
            { path: 'ecommerce', component: ArmaCardListComponent, title: 'Pipoco Silencioso'},

            { path: 'login', component: LoginUsuarioComponent, title: 'Login de usuario'},
            { path: 'cadastro', component: CadastroUsuarioComponent, title: 'Cadastro de Usuario'}

        ]
    },

    { 
        path: 'user', 
        component: UserTemplateComponent,
        title: 'Area do Usuario',
        canActivate: [authGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'ecommerce'},
        
            { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho de Compras', canActivate: [authGuard]},

            { path: 'perfil', component: PerfilComponent, title: 'Perfil do usuário', canActivate: [authGuard]},
            { path: 'alterarsenha', component: AlterarSenhaComponent, title: 'Alterar Senha', canActivate: [authGuard]},
            //{ path: 'alterarlogin', component: AlterarLoginComponent, title: 'Alterar Login', canActivate: [authGuard]},

            { path: 'enderecos',component: EnderecoListComponent, title: 'Lista de Enderecos'},
            { path: 'enderecos/new',component: EnderecoFormComponent, title: 'Novo Endereco'},
            { path: 'enderecos/edit/:id',component: EnderecoFormComponent, resolve: {endereco: enderecoResolver}},

//            { path: 'pedidos',component: EnderecoListComponent, title: 'Lista de Enderecos'},

            { path: 'finalizarpedido',component: FinalizarPedidoComponent, title: 'Resumo do pedido'},
            { path: 'pedidofinalizado',component: PedidoFinalizadoComponent, title: 'Obrigado por comprar'},

        ]
    },

    { 
        path: 'admin', 
        component: AdminTemplateComponent,
        title: 'Administração',
        
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'armas'},
            
            {path: 'login', component: LoginComponent, title: 'Login de Usuario'},

            {path: 'armas', component: ArmaListComponent, title: 'Lista de Armas'},
            {path: 'armas/new', component: ArmaFormComponent, title: 'Cadastrar Arma', canActivate: [authGuard]},
            {path: 'armas/edit/:id', component: ArmaFormComponent, resolve: {arma: armaResolver}, canActivate: [authGuard]},
            
            {path: 'funcionarios',component: FuncionarioListComponent, title: 'Lista de Funcionarios'},
            {path: 'funcionarios/new',component: FuncionarioFormComponent, title: 'Novo Funcionario', canActivate: [authGuard]},
            {path: 'funcionarios/edit/:id',component: FuncionarioFormComponent, resolve: {funcionario: funcionarioResolver}, canActivate: [authGuard]},

            {path: 'clientes',component: ClienteListComponent, title: 'Lista de Clientes'},
            {path: 'clientes/new',component: ClienteFormComponent, title: 'Novo Cliente'},
            {path: 'clientes/edit/:id',component: ClienteFormComponent, resolve: {cliente: clienteResolver}},

            {path: 'acabamentos',component: AcabamentoListComponent, title: 'Lista de Acabamentos'},
            {path: 'acabamentos/new',component: AcabamentoFormComponent, title: 'Novo acabamento'},
            {path: 'acabamentos/edit/:id',component: AcabamentoFormComponent, resolve: {acabamento: acabamentoResolver}},

            {path: 'materiais', component: MaterialListComponent, title: 'Lista de Materiais'},
            {path: 'materiais/new',component: MaterialFormComponent, title: 'Novo Material'},
            {path: 'materiais/edit/:id',component: MaterialFormComponent, resolve: {material: materialResolver}},

            {path: 'tipotiros', component: TipoTiroListComponent, title: 'Listagem dos Tipos de Tiros'},
            {path: 'tipotiros/new',component: TipoTiroFormComponent, title: 'Novo Tipo de Tiro'},
            {path: 'tipotiros/edit/:id',component: TipoTiroFormComponent, resolve: {tipoTiro: tipoTiroResolver}},

            {path: 'calibres', component: CalibreListComponent, title: 'Listagem de calibres'},
            {path: 'calibres/new',component: CalibreFormComponent, title: 'Novo Calibre'},
            {path: 'calibres/edit/:id',component: CalibreFormComponent, resolve: {calibre: calibreResolver}},

            {path: 'tiposarma', component: TipoArmaListComponent, title: 'Listagem dos Tipos de Armas'},
            {path: 'tiposarma/new',component: TipoArmaFormComponent, title: 'Novo Tipo de Arma'},
            {path: 'tiposarma/edit/:id',component: TipoArmaFormComponent, resolve: {tipoArma: tipoArmaResolver}},
        ]
    }
    
]
