import { Injectable } from '@angular/core';

export interface AuditEntry {
  action: 'create' | 'update' | 'delete';
  entity: string;
  entityId: number;
  requestedBy: string;
  unitId: string;
  requestedAt: string;
}

@Injectable({ providedIn: 'root' })
export class AuditService {
  private readonly storageKey = 'consolida-iag-audit';

  record(entry: AuditEntry): void {
    const entries = this.read();
    entries.push(entry);
    localStorage.setItem(this.storageKey, JSON.stringify(entries));
  }

  private read(): AuditEntry[] {
    if (typeof localStorage === 'undefined') {
      return [];
    }
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return [];
    }
    try {
      return JSON.parse(stored) as AuditEntry[];
    } catch {
      return [];
    }
  }
}
