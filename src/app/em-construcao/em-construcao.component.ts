import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-em-construcao',
  template: '<main class="flex min-h-screen items-center justify-center bg-slate-100 p-6"><section class="rounded-xl bg-white px-12 py-16 text-center shadow-sm"><div class="mx-auto mb-5 text-5xl">🚧</div><h1 class="text-2xl font-bold text-slate-800">Em construção</h1><p class="mt-2 text-slate-500">Esta página estará disponível em breve.</p><button class="mt-8 rounded-lg bg-[#0c3558] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#123d62]" type="button" (click)="goBack()">Voltar</button></section></main>',
})
export class EmConstrucaoComponent {
  constructor(private readonly location: Location) {}

  protected goBack(): void {
    this.location.back();
  }
}
