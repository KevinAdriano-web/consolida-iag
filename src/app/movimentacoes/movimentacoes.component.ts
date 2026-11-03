import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LocalDataService } from '../services/local-data.service';

@Component({
  selector: 'app-movimentacoes',
  imports: [DatePipe],
  template: `
    <section class="history-page">
      <p class="eyebrow">Histórico / Movimentações de estoque</p>
      <h1>Movimentações de estoque</h1>
      <p class="description">Acompanhe as alterações registradas na base local.</p>
      <div class="table-card">
        <table>
          <thead><tr><th>Produto</th><th>Unidade</th><th>Saldo</th><th>Atualizado em</th></tr></thead>
          <tbody>
            @for (record of data.stock(); track record.productId + record.unitId) {
              <tr><td>{{ productName(record.productId) }}</td><td>{{ record.unitId.toUpperCase() }}</td><td>{{ record.quantity }}</td><td>{{ record.updatedAt | date:'dd/MM/yyyy HH:mm' }}</td></tr>
            } @empty { <tr><td colspan="4" class="empty">Nenhuma movimentação registrada.</td></tr> }
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`.history-page{color:#334155}.eyebrow{color:#64748b;font-size:.875rem}.history-page h1{color:#0c3558;font-size:1.75rem;margin:.4rem 0}.description{font-size:1rem}.table-card{background:#fff;border:1px solid #e2e8f0;border-radius:.4rem;margin-top:1.25rem;overflow:auto}table{border-collapse:collapse;min-width:42rem;width:100%}th{background:#f8fafc;color:#475569;font-size:.75rem;text-align:left;text-transform:uppercase}th,td{border-bottom:1px solid #f1f5f9;padding:.9rem 1rem}td{font-size:.875rem}.empty{text-align:center;color:#64748b;padding:2rem}`],
})
export class MovimentacoesComponent {
  constructor(protected readonly data: LocalDataService) {}
  protected productName(productId: number) { return this.data.products().find((product) => product.id === productId)?.description ?? 'Produto removido'; }
}
