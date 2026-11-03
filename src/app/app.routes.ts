import { Routes } from '@angular/router';
import { CadastrarProdutosComponent } from './cadastrar-produtos/cadastrar-produtos.component';
import { LoginComponent } from './login/login.component';
import { CadastrarCozinhasComponent } from './cadastrar-cozinhas/cadastrar-cozinhas.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { MovimentacoesComponent } from './movimentacoes/movimentacoes.component';
import { PedidosConsolidadosComponent } from './pedidos-consolidados/pedidos-consolidados.component';
import { QuantidadesTotaisComponent } from './quantidades-totais/quantidades-totais.component';
import { SolicitacoesCozinhasComponent } from './solicitacoes-cozinhas/solicitacoes-cozinhas.component';
import { TermosComponent } from './termos/termos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'solicitacoes-cozinhas', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'pedidos-consolidados', component: PedidosConsolidadosComponent },
  { path: 'quantidades-totais', component: QuantidadesTotaisComponent },
  { path: 'estoque', component: EstoqueComponent },
  { path: 'movimentacoes', component: MovimentacoesComponent },
  { path: 'solicitacoes-cozinhas', component: SolicitacoesCozinhasComponent },
  { path: 'cadastrar-cozinhas', component: CadastrarCozinhasComponent },
  { path: 'termos', component: TermosComponent },
  { path: 'cadastrar-produtos', component: CadastrarProdutosComponent },
  { path: '**', redirectTo: '' },
];
