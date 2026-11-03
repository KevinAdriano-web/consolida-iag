import { Injectable, signal } from '@angular/core';

export interface KitchenUnit {
  id: string;
  name: string;
  code: string;
}

@Injectable({ providedIn: 'root' })
export class UnitService {
  readonly units: KitchenUnit[] = [
    { id: 'cei', name: 'Centro de Educação Infantil', code: 'CEI' },
    { id: 'cca', name: 'Centro para Crianças e Adolescentes', code: 'CCA' },
    { id: 'cj', name: 'Centro da Juventude', code: 'CJ' },
  ];
  readonly selectedUnit = signal(this.units[0]);

  selectUnit(unitId: string): void {
    const unit = this.units.find((item) => item.id === unitId);
    if (unit) {
      this.selectedUnit.set(unit);
    }
  }
}
