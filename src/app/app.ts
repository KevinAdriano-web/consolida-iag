import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { UnitService } from './services/unit.service';

@Component({
  imports: [FormsModule, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('consolida-iag');
  protected readonly unitService: UnitService;
  protected currentUrl = '';

  constructor(private readonly router: Router, unitService: UnitService) {
    this.unitService = unitService;
    this.currentUrl = router.url;
    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.currentUrl = (event as NavigationEnd).urlAfterRedirects;
    });
  }

  protected get isLogin(): boolean {
    return this.currentUrl === '/login';
  }

  protected get isLegal(): boolean {
    return this.currentUrl === '/termos';
  }

  protected isGroupActive(group: 'solicitacoes' | 'estoque' | 'cadastros' | 'historico'): boolean {
    const groups = {
      solicitacoes: ['/pedidos-consolidados', '/quantidades-totais', '/solicitacoes-cozinhas'],
      estoque: ['/cadastrar-produtos', '/estoque', '/movimentacoes'],
      cadastros: ['/cadastrar-produtos', '/cadastrar-cozinhas'],
      historico: ['/movimentacoes'],
    };
    return groups[group].some((path) => this.currentUrl.startsWith(path));
  }
}
