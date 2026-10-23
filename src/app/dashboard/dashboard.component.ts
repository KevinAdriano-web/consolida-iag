import { Component } from '@angular/core';
import { EmConstrucaoComponent } from '../em-construcao/em-construcao.component';

@Component({ selector: 'app-dashboard', imports: [EmConstrucaoComponent], template: '<app-em-construcao />' })
export class DashboardComponent {}
