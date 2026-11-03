import { Component } from '@angular/core';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-cadastrar-cozinhas',
  template: `<section class="units-page"><p class="eyebrow">Cadastros / Cozinhas</p><h1>Cadastro de cozinhas</h1><p>Unidades disponíveis para solicitações e controle de estoque.</p><div class="unit-grid">@for (unit of unitService.units; track unit.id) {<article><strong>{{ unit.code }}</strong><h2>{{ unit.name }}</h2><span>Status: Ativa</span></article>}</div></section>`,
  styles: [`.units-page{color:#334155}.eyebrow{color:#64748b;font-size:.875rem}.units-page h1{color:#0c3558;font-size:1.75rem;margin:.4rem 0}.units-page>p{font-size:1rem}.unit-grid{display:grid;gap:1rem;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:1.25rem}.unit-grid article{background:#fff;border:1px solid #e2e8f0;border-radius:.4rem;padding:1.25rem}.unit-grid strong{color:#ea580c;font-size:1.25rem}.unit-grid h2{color:#0c3558;font-size:1.1rem;margin:1rem 0}.unit-grid span{color:#166534;font-size:.875rem}@media(max-width:48rem){.unit-grid{grid-template-columns:1fr}}`],
})
export class CadastrarCozinhasComponent {
  constructor(protected readonly unitService: UnitService) {}
}
