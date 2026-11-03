import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalDataService } from '../services/local-data.service';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-estoque',
  imports: [FormsModule],
  template: `
    <div class="local-page"><header class="page-heading"><div><p>Estoque / Estoque atual</p><h1>Estoque disponível</h1><span>{{ unitService.selectedUnit().code }} — {{ unitService.selectedUnit().name }}</span></div></header>
    <section class="local-card"><div class="card-title"><div><h2>Saldo por produto</h2><p>Atualize o saldo localmente para simular as movimentações da unidade.</p></div></div><div class="table-wrap"><table><thead><tr><th>Produto</th><th>Marca</th><th>Saldo atual</th><th>Atualização</th></tr></thead><tbody>@for (product of data.products(); track product.id) {<tr><td>{{ product.description }}</td><td>{{ product.brand }}</td><td [class.critical]="stock(product.id) < 5">{{ stock(product.id) }}</td><td><input #quantity type="number" min="0" [value]="stock(product.id)" [attr.aria-label]="'Novo saldo de ' + product.description" /><button type="button" (click)="update(product.id, quantity.value)">Salvar</button></td></tr>}</tbody></table></div></section>
    @if (message) {<p class="notice" role="status">{{ message }}</p>}</div>
  `,
  styles: [`.local-page{color:#334155}.page-heading{margin-bottom:1.25rem}.page-heading p{color:#64748b;font-size:.875rem;margin:0 0 .4rem}.page-heading h1{color:#0c3558;font-size:1.75rem;margin:0}.page-heading span{display:block;font-size:1rem;margin-top:.5rem}.local-card{background:#fff;border:1px solid #e2e8f0;border-radius:.4rem}.card-title{border-bottom:1px solid #e2e8f0;padding:1rem}h2{color:#0c3558;font-size:1.15rem;margin:0}.card-title p{color:#64748b;font-size:.875rem;margin:.4rem 0 0}.table-wrap{overflow-x:auto}table{border-collapse:collapse;min-width:44rem;width:100%}th{background:#f8fafc;color:#475569;font-size:.75rem;text-align:left;text-transform:uppercase}th,td{border-bottom:1px solid #f1f5f9;padding:.9rem 1rem}td{font-size:.875rem}td input{border:1px solid #cbd5e1;border-radius:.25rem;font-size:.875rem;min-height:2.4rem;padding:.4rem;width:6rem}td button{background:#0c3558;border:0;border-radius:.25rem;color:white;cursor:pointer;font-size:.875rem;margin-left:.5rem;min-height:2.4rem;padding:.4rem .7rem}.critical{color:#b91c1c;font-weight:700}.notice{background:#ecfdf5;border:1px solid #86efac;border-radius:.3rem;color:#166534;font-size:.875rem;padding:.75rem 1rem}`],
})
export class EstoqueComponent {
  protected message = '';
  constructor(protected readonly data: LocalDataService, protected readonly unitService: UnitService) {}
  protected stock(productId: number) { return this.data.stockForUnit(this.unitService.selectedUnit().id).find((record) => record.productId === productId)?.quantity ?? 0; }
  protected update(productId: number, value: string) { this.data.updateStock(productId, this.unitService.selectedUnit().id, Math.max(0, Number(value) || 0)); this.message = `Saldo atualizado para ${this.unitService.selectedUnit().code}.`; }
}
