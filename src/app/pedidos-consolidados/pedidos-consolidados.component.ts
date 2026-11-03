import { Component } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-pedidos-consolidados',
  template: `
    <div class="local-page"><header class="page-heading"><div><p>Solicitações / Pedidos consolidados</p><h1>Pedidos consolidados</h1><span>Produtos agrupados e somados entre CEI, CCA e CJ.</span></div></header>
    <section class="local-card"><div class="card-title"><div><h2>Consolidação das solicitações enviadas</h2><p>{{ data.requests().length }} solicitação(ões) registrada(s) nesta base local.</p></div></div>
      <div class="table-wrap"><table><thead><tr><th>Produto</th><th>CEI</th><th>CCA</th><th>CJ</th><th>Total</th></tr></thead><tbody>@for (item of items; track item.product.id) {<tr><td><strong>{{ item.product.description }}</strong><small>{{ item.product.brand }}</small></td><td>{{ quantityFor(item, 'cei') }}</td><td>{{ quantityFor(item, 'cca') }}</td><td>{{ quantityFor(item, 'cj') }}</td><td class="total">{{ item.total }}</td></tr>} @empty {<tr><td colspan="5" class="empty">Envie solicitações pelas unidades para visualizar a consolidação.</td></tr>}</tbody></table></div>
    </section></div>
  `,
  styles: [`.local-page{color:#334155}.page-heading{margin-bottom:1.25rem}.page-heading p{color:#64748b;font-size:.875rem;margin:0 0 .4rem}.page-heading h1{color:#0c3558;font-size:1.75rem;margin:0}.page-heading span{display:block;font-size:1rem;margin-top:.5rem}.local-card{background:#fff;border:1px solid #e2e8f0;border-radius:.4rem}.card-title{border-bottom:1px solid #e2e8f0;padding:1rem}h2{color:#0c3558;font-size:1.15rem;margin:0}.card-title p{color:#64748b;font-size:.875rem;margin:.4rem 0 0}.table-wrap{overflow-x:auto}table{border-collapse:collapse;min-width:42rem;width:100%}th{background:#f8fafc;color:#475569;font-size:.75rem;text-align:left;text-transform:uppercase}th,td{border-bottom:1px solid #f1f5f9;padding:.9rem 1rem}td{font-size:.875rem}td:first-child{display:flex;flex-direction:column;gap:.3rem}td small{color:#64748b;font-size:.875rem}.total{color:#0c3558;font-weight:700}.empty{text-align:center;color:#64748b;padding:2rem}`],
})
export class PedidosConsolidadosComponent {
  constructor(protected readonly data: LocalDataService, private readonly units: UnitService) {}
  protected get items() { return this.data.consolidatedItems(); }
  protected quantityFor(item: ReturnType<LocalDataService['consolidatedItems']>[number], unitId: string) { return item.units.filter((unit) => unit.unitId === unitId).reduce((total, unit) => total + unit.quantity, 0); }
}
