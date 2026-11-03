import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuditService } from '../services/audit.service';
import { UnitService } from '../services/unit.service';

interface Product {
  id: number;
  description: string;
  quantity: number;
  brand: string;
  active: boolean;
  unitId: string;
  requestedBy: string;
}

@Component({
  selector: 'app-cadastrar-produtos',
  imports: [FormsModule],
  templateUrl: './cadastrar-produtos.component.html',
  styleUrl: './cadastrar-produtos.component.css',
})
export class CadastrarProdutosComponent implements AfterViewInit {
  @ViewChild('pageTitle') private pageTitle?: ElementRef<HTMLElement>;
  @ViewChild('confirmationButton') private confirmationButton?: ElementRef<HTMLButtonElement>;
  protected description = '';
  protected quantity: number | null = null;
  protected brand = '';
  protected active = true;
  protected search = '';
  protected editingId: number | null = null;
  protected readonly unitService: UnitService;
  protected confirmation: { action: 'update' | 'delete'; productId: number } | null = null;
  protected confirmationTitle = '';
  protected confirmationMessage = '';

  protected products: Product[] = [
    { id: 1042, description: 'Azeite Extra Virgem 500ml', quantity: 12, brand: 'Gallo', active: true, unitId: 'cei', requestedBy: 'Eduardo' },
    { id: 1043, description: 'Arroz Integral 1kg', quantity: 24, brand: 'Tio João', active: true, unitId: 'cei', requestedBy: 'Eduardo' },
    { id: 1044, description: 'Leite Desnatado 1L', quantity: 18, brand: 'Nestlé', active: true, unitId: 'cca', requestedBy: 'Eduardo' },
    { id: 1045, description: 'Sabão em Pó 2kg', quantity: 8, brand: 'Omo', active: false, unitId: 'cj', requestedBy: 'Eduardo' },
    { id: 1046, description: 'Macarrão Espaguete 500g', quantity: 30, brand: 'Barilla', active: true, unitId: 'cca', requestedBy: 'Eduardo' },
  ];

  constructor(unitService: UnitService, private readonly auditService: AuditService) {
    this.unitService = unitService;
  }

  ngAfterViewInit(): void {
    this.pageTitle?.nativeElement.focus();
  }

  protected get filteredProducts(): Product[] {
    const query = this.search.trim().toLocaleLowerCase();
    return this.products.filter((product) => product.unitId === this.unitService.selectedUnit().id)
      .filter((product) => !query || `${product.description} ${product.brand}`.toLocaleLowerCase().includes(query));
  }

  protected saveProduct(): void {
    if (!this.description.trim() || !this.brand.trim() || !this.quantity || this.quantity < 1) {
      return;
    }

    const product = {
      description: this.description.trim(),
      quantity: this.quantity,
      brand: this.brand.trim(),
      active: this.active,
      unitId: this.unitService.selectedUnit().id,
      requestedBy: 'Eduardo',
    };

    if (this.editingId !== null) {
      this.openConfirmation('update', this.editingId);
    } else {
      this.products = [{ id: Math.max(...this.products.map((item) => item.id), 1041) + 1, ...product }, ...this.products];
      this.auditService.record({ action: 'create', entity: 'product', entityId: this.products[0].id, requestedBy: 'Eduardo', unitId: product.unitId, requestedAt: new Date().toISOString() });
      this.clearForm();
    }
  }

  protected editProduct(product: Product): void {
    this.editingId = product.id;
    this.description = product.description;
    this.quantity = product.quantity;
    this.brand = product.brand;
    this.active = product.active;
  }

  protected deleteProduct(id: number): void {
    this.openConfirmation('delete', id);
  }

  protected openConfirmation(action: 'update' | 'delete', productId: number): void {
    this.confirmation = { action, productId };
    this.confirmationTitle = action === 'update' ? 'Confirmar atualização' : 'Confirmar exclusão';
    this.confirmationMessage = action === 'update'
      ? 'Deseja realmente atualizar este produto?'
      : 'Deseja realmente excluir este produto? Esta ação não pode ser desfeita.';
    setTimeout(() => this.confirmationButton?.nativeElement.focus());
  }

  protected confirmAction(): void {
    if (!this.confirmation) {
      return;
    }

    const { action, productId } = this.confirmation;
    if (action === 'update') {
      const product = {
        description: this.description.trim(),
        quantity: this.quantity as number,
        brand: this.brand.trim(),
        active: this.active,
        unitId: this.unitService.selectedUnit().id,
        requestedBy: 'Eduardo',
      };
      this.products = this.products.map((item) => item.id === productId ? { ...item, ...product } : item);
      this.auditService.record({ action: 'update', entity: 'product', entityId: productId, requestedBy: 'Eduardo', unitId: product.unitId, requestedAt: new Date().toISOString() });
      this.clearForm();
    } else {
      this.products = this.products.filter((product) => product.id !== productId);
      this.auditService.record({ action: 'delete', entity: 'product', entityId: productId, requestedBy: 'Eduardo', unitId: this.unitService.selectedUnit().id, requestedAt: new Date().toISOString() });
      if (this.editingId === productId) {
        this.clearForm();
      }
    }
    this.closeConfirmation();
  }

  protected closeConfirmation(): void {
    this.confirmation = null;
  }

  protected clearForm(): void {
    this.description = '';
    this.quantity = null;
    this.brand = '';
    this.active = true;
    this.editingId = null;
  }
}
