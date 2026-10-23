import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Product {
  id: number;
  description: string;
  quantity: number;
  brand: string;
  price: string;
  category: string;
  active: boolean;
}

@Component({
  selector: 'app-cadastrar-produtos',
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastrar-produtos.component.html',
  styleUrl: './cadastrar-produtos.component.css',
})
export class CadastrarProdutosComponent {
  protected description = '';
  protected quantity: number | null = null;
  protected price = '';
  protected brand = '';
  protected category = '';
  protected active = true;
  protected search = '';
  protected editingId: number | null = null;

  protected products: Product[] = [
    { id: 1042, description: 'Azeite Extra Virgem 500ml', quantity: 12, brand: 'Gallo', price: 'R$ 34,90', category: 'Mercearia', active: true },
    { id: 1043, description: 'Arroz Integral 1kg', quantity: 24, brand: 'Tio João', price: 'R$ 7,50', category: 'Mercearia', active: true },
    { id: 1044, description: 'Leite Desnatado 1L', quantity: 18, brand: 'Nestlé', price: 'R$ 5,20', category: 'Laticínios', active: true },
    { id: 1045, description: 'Sabão em Pó 2kg', quantity: 8, brand: 'Omo', price: 'R$ 22,90', category: 'Limpeza', active: false },
    { id: 1046, description: 'Macarrão Espaguete 500g', quantity: 30, brand: 'Barilla', price: 'R$ 6,80', category: 'Mercearia', active: true },
  ];

  protected get filteredProducts(): Product[] {
    const query = this.search.trim().toLocaleLowerCase();
    return query
      ? this.products.filter((product) => `${product.description} ${product.brand}`.toLocaleLowerCase().includes(query))
      : this.products;
  }

  protected saveProduct(): void {
    if (!this.description.trim() || !this.price.trim() || !this.brand || !this.category || !this.quantity || this.quantity < 1) {
      return;
    }

    const product = {
      description: this.description.trim(),
      quantity: this.quantity,
      brand: this.brand,
      price: this.price.trim().startsWith('R$') ? this.price.trim() : `R$ ${this.price.trim()}`,
      category: this.category,
      active: this.active,
    };

    if (this.editingId !== null) {
      this.products = this.products.map((item) => item.id === this.editingId ? { ...item, ...product } : item);
    } else {
      this.products = [{ id: Math.max(...this.products.map((item) => item.id), 1041) + 1, ...product }, ...this.products];
    }

    this.clearForm();
  }

  protected editProduct(product: Product): void {
    this.editingId = product.id;
    this.description = product.description;
    this.quantity = product.quantity;
    this.price = product.price;
    this.brand = product.brand;
    this.category = product.category;
    this.active = product.active;
  }

  protected deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
    if (this.editingId === id) {
      this.clearForm();
    }
  }

  protected clearForm(): void {
    this.description = '';
    this.quantity = null;
    this.price = '';
    this.brand = '';
    this.category = '';
    this.active = true;
    this.editingId = null;
  }
}
