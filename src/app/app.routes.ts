import { Routes } from '@angular/router';
import { CadastrarProdutosComponent } from './cadastrar-produtos/cadastrar-produtos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CadastrarCozinhasComponent } from './cadastrar-cozinhas/cadastrar-cozinhas.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { EmConstrucaoComponent } from './em-construcao/em-construcao.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { PedidosConsolidadosComponent } from './pedidos-consolidados/pedidos-consolidados.component';
import { QuantidadesTotaisComponent } from './quantidades-totais/quantidades-totais.component';
import { SolicitacoesCozinhasComponent } from './solicitacoes-cozinhas/solicitacoes-cozinhas.component';

export const routes: Routes = [
  { path: '', component: CadastrarProdutosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'em-construcao', component: EmConstrucaoComponent },
  { path: 'pedidos-consolidados', component: PedidosConsolidadosComponent },
  { path: 'quantidades-totais', component: QuantidadesTotaisComponent },
  { path: 'estoque', component: EstoqueComponent },
  { path: 'movimentacoes', component: MovimentacoesComponent },
  { path: 'solicitacoes-cozinhas', component: SolicitacoesCozinhasComponent },
  { path: 'cadastrar-cozinhas', component: CadastrarCozinhasComponent },
  { path: 'configuracoes', component: ConfiguracoesComponent },
  { path: 'cadastrar-produtos', component: CadastrarProdutosComponent },
  { path: '**', redirectTo: '' },
];
