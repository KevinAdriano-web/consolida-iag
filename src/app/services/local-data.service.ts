import { Injectable, signal } from '@angular/core';

export interface LocalProduct {
  id: number;
  description: string;
  brand: string;
  active: boolean;
}

export interface StockRecord {
  productId: number;
  unitId: string;
  quantity: number;
  updatedAt: string;
}

export interface SupplyRequest {
  id: string;
  unitId: string;
  week: string;
  status: 'Enviada' | 'Rascunho';
  requestedBy: string;
  createdAt: string;
  items: { productId: number; quantity: number }[];
}

@Injectable({ providedIn: 'root' })
export class LocalDataService {
  readonly products = signal<LocalProduct[]>([
    { id: 1042, description: 'Arroz Integral 1kg', brand: 'Tio João', active: true },
    { id: 1043, description: 'Azeite Extra Virgem 500ml', brand: 'Gallo', active: true },
    { id: 1044, description: 'Leite Desnatado 1L', brand: 'Nestlé', active: true },
    { id: 1045, description: 'Sabão em Pó 2kg', brand: 'Omo', active: true },
    { id: 1046, description: 'Macarrão Espaguete 500g', brand: 'Barilla', active: true },
  ]);
  readonly stock = signal<StockRecord[]>([
    { productId: 1042, unitId: 'cei', quantity: 24, updatedAt: new Date().toISOString() },
    { productId: 1042, unitId: 'cca', quantity: 18, updatedAt: new Date().toISOString() },
    { productId: 1042, unitId: 'cj', quantity: 12, updatedAt: new Date().toISOString() },
    { productId: 1043, unitId: 'cei', quantity: 12, updatedAt: new Date().toISOString() },
    { productId: 1043, unitId: 'cca', quantity: 8, updatedAt: new Date().toISOString() },
    { productId: 1043, unitId: 'cj', quantity: 6, updatedAt: new Date().toISOString() },
    { productId: 1044, unitId: 'cei', quantity: 18, updatedAt: new Date().toISOString() },
    { productId: 1044, unitId: 'cca', quantity: 4, updatedAt: new Date().toISOString() },
    { productId: 1044, unitId: 'cj', quantity: 10, updatedAt: new Date().toISOString() },
  ]);
  readonly requests = signal<SupplyRequest[]>([]);

  private readonly storageKey = 'consolida-iag-local-data';

  constructor() {
    this.restore();
  }

  submitRequest(unitId: string, items: { productId: number; quantity: number }[], requestedBy = 'Eduardo'): void {
    const request: SupplyRequest = {
      id: `SOL-${String(Date.now()).slice(-6)}`,
      unitId,
      week: this.currentWeek(),
      status: 'Enviada',
      requestedBy,
      createdAt: new Date().toISOString(),
      items,
    };
    this.requests.update((requests) => [request, ...requests]);
    this.persist();
  }

  updateStock(productId: number, unitId: string, quantity: number): void {
    this.stock.update((records) => {
      const current = records.find((record) => record.productId === productId && record.unitId === unitId);
      if (current) {
        return records.map((record) => record === current ? { ...record, quantity, updatedAt: new Date().toISOString() } : record);
      }
      return [...records, { productId, unitId, quantity, updatedAt: new Date().toISOString() }];
    });
    this.persist();
  }

  stockForUnit(unitId: string): StockRecord[] {
    return this.stock().filter((record) => record.unitId === unitId);
  }

  consolidatedItems(): { product: LocalProduct; total: number; units: { unitId: string; quantity: number }[] }[] {
    const totals = new Map<number, { total: number; units: { unitId: string; quantity: number }[] }>();
    for (const request of this.requests().filter((item) => item.status === 'Enviada')) {
      for (const item of request.items) {
        const current = totals.get(item.productId) ?? { total: 0, units: [] };
        current.total += item.quantity;
        current.units.push({ unitId: request.unitId, quantity: item.quantity });
        totals.set(item.productId, current);
      }
    }
    return [...totals.entries()]
      .map(([productId, values]) => ({ product: this.products().find((product) => product.id === productId)!, ...values }))
      .filter((item) => item.product);
  }

  currentWeek(): string {
    const date = new Date();
    const day = date.getDay() || 7;
    date.setDate(date.getDate() + 4 - day);
    const yearStart = new Date(date.getFullYear(), 0, 1);
    const week = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${date.getFullYear()} / ${String(week).padStart(2, '0')}`;
  }

  private persist(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, JSON.stringify({ products: this.products(), stock: this.stock(), requests: this.requests() }));
    }
  }

  private restore(): void {
    if (typeof localStorage === 'undefined') {
      return;
    }
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return;
    }
    try {
      const data = JSON.parse(stored) as { products?: LocalProduct[]; stock?: StockRecord[]; requests?: SupplyRequest[] };
      if (data.products) this.products.set(data.products);
      if (data.stock) this.stock.set(data.stock);
      if (data.requests) this.requests.set(data.requests);
    } catch {
      localStorage.removeItem(this.storageKey);
    }
  }
}
