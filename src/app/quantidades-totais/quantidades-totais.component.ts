import { Component } from '@angular/core';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-quantidades-totais',
  template: `<section class="totals-page"><p class="eyebrow">Solicitações / Quantidades solicitadas</p><h1>Quantidades solicitadas</h1><p>Totais calculados a partir das solicitações enviadas.</p><div class="table-card"><table><thead><tr><th>Produto</th><th>CEI</th><th>CCA</th><th>CJ</th><th>Total</th></tr></thead><tbody>@for (item of data.consolidatedItems(); track item.product.id) {<tr><td>{{ item.product.description }}</td><td>{{ quantity(item,'cei') }}</td><td>{{ quantity(item,'cca') }}</td><td>{{ quantity(item,'cj') }}</td><td class="total">{{ item.total }}</td></tr>} @empty {<tr><td colspan="5" class="empty">Nenhuma solicitação enviada.</td></tr>}</tbody></table></div></section>`,
  styles: [`.totals-page{color:#334155}.eyebrow{color:#64748b;font-size:.875rem}.totals-page h1{color:#0c3558;font-size:1.75rem;margin:.4rem 0}.totals-page>p{font-size:1rem}.table-card{background:#fff;border:1px solid #e2e8f0;border-radius:.4rem;margin-top:1.25rem;overflow:auto}table{border-collapse:collapse;min-width:42rem;width:100%}th{background:#f8fafc;color:#475569;font-size:.75rem;text-align:left;text-transform:uppercase}th,td{border-bottom:1px solid #f1f5f9;padding:.9rem 1rem}td{font-size:.875rem}.total{color:#0c3558;font-weight:700}.empty{text-align:center;color:#64748b;padding:2rem}`],
})
export class QuantidadesTotaisComponent {
  constructor(protected readonly data: LocalDataService) {}
  protected quantity(item: ReturnType<LocalDataService['consolidatedItems']>[number], unitId: string) { return item.units.filter((unit) => unit.unitId === unitId).reduce((total, unit) => total + unit.quantity, 0); }
}
