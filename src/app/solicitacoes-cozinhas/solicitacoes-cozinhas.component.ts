import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-solicitacoes-cozinhas',
  imports: [FormsModule],
  template: `
    <div class="local-page">
      <header class="page-heading"><div><p>Solicitações / Nova solicitação</p><h1>Solicitação semanal de insumos</h1><span>{{ unitService.selectedUnit().code }} — {{ unitService.selectedUnit().name }}</span></div><strong>Semana {{ week }}</strong></header>
      <section class="local-card">
        <div class="card-title"><div><h2>Selecionar produtos</h2><p>Informe os produtos e quantidades que esta unidade precisa.</p></div><label>Buscar produto <input [(ngModel)]="search" type="search" placeholder="Digite o produto..." /></label></div>
        <div class="product-list">
          @for (product of filteredProducts; track product.id) {
            <label class="product-row"><span><strong>{{ product.description }}</strong><small>Marca: {{ product.brand }}</small></span><input type="number" min="0" [ngModel]="quantities[product.id] || 0" (ngModelChange)="setQuantity(product.id, $event)" [attr.aria-label]="'Quantidade de ' + product.description" /></label>
          }
        </div>
        <div class="card-footer"><span>{{ selectedCount }} produto(s) selecionado(s)</span><button class="primary-button" type="button" [disabled]="selectedCount === 0" (click)="submit()">Enviar solicitação semanal</button></div>
      </section>
      @if (message) { <p class="notice" role="status">{{ message }}</p> }
    </div>
  `,
  styles: [`
    :host { display:block; } .local-page { color:#334155; } .page-heading { align-items:end; display:flex; justify-content:space-between; margin-bottom:1.25rem; } .page-heading p { color:#64748b; font-size:.875rem; margin:0 0 .4rem; } h1 { color:#0c3558; font-size:1.75rem; margin:0; } .page-heading span { display:block; font-size:1rem; margin-top:.5rem; } .page-heading strong { color:#0c3558; font-size:1rem; } .local-card { background:#fff; border:1px solid #e2e8f0; border-radius:.4rem; } .card-title { align-items:center; border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between; padding:1rem; } h2 { color:#0c3558; font-size:1.15rem; margin:0; } .card-title p { color:#64748b; font-size:.875rem; margin:.4rem 0 0; } .card-title label { color:#475569; font-size:.875rem; } input { border:1px solid #cbd5e1; border-radius:.25rem; font-size:.875rem; min-height:2.5rem; margin-left:.5rem; padding:.5rem .7rem; } .product-list { padding:0 1rem; } .product-row { align-items:center; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; min-height:4rem; } .product-row span { display:flex; flex-direction:column; gap:.3rem; } .product-row small { color:#64748b; font-size:.875rem; } .product-row input { margin:0; text-align:center; width:6rem; } .card-footer { align-items:center; background:#f8fafc; display:flex; justify-content:space-between; padding:1rem; } .primary-button { background:#ea580c; border:0; border-radius:.3rem; color:#fff; cursor:pointer; font-size:.875rem; font-weight:700; min-height:2.75rem; padding:.7rem 1rem; } .primary-button:disabled { cursor:not-allowed; opacity:.5; } .notice { background:#ecfdf5; border:1px solid #86efac; border-radius:.3rem; color:#166534; font-size:.875rem; padding:.75rem 1rem; } @media(max-width:48rem){.page-heading,.card-title,.card-footer{align-items:stretch; flex-direction:column; gap:.75rem}.card-title input{margin:.5rem 0 0;width:100%}}
  `],
})
export class SolicitacoesCozinhasComponent {
  protected search = '';
  protected quantities: Record<number, number> = {};
  protected message = '';
  constructor(protected readonly unitService: UnitService, private readonly data: LocalDataService) {}
  protected get filteredProducts() { const query = this.search.toLocaleLowerCase().trim(); return this.data.products().filter((product) => product.active && (!query || `${product.description} ${product.brand}`.toLocaleLowerCase().includes(query))); }
  protected get selectedCount() { return Object.values(this.quantities).filter((quantity) => quantity > 0).length; }
  protected get week() { return this.data.currentWeek(); }
  protected setQuantity(productId: number, value: number) { this.quantities[productId] = Math.max(0, Number(value) || 0); }
  protected submit() { const items = Object.entries(this.quantities).filter(([, quantity]) => quantity > 0).map(([productId, quantity]) => ({ productId: Number(productId), quantity })); this.data.submitRequest(this.unitService.selectedUnit().id, items); this.quantities = {}; this.message = `Solicitação enviada para ${this.unitService.selectedUnit().code}.`; }
}
