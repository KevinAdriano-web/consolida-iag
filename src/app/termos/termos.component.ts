import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-termos',
  imports: [RouterLink],
  template: `
    <main class="legal-page" tabindex="-1">
      <a class="back-link" routerLink="/">← Voltar para o sistema</a>
      <h1>Termos de uso e política de privacidade</h1>
      <p class="lead">Última atualização: 03 de novembro de 2026</p>
      <section>
        <h2>Termos de uso</h2>
        <p>O Consolida IAG é uma plataforma interna para organizar produtos, estoques e solicitações das cozinhas. Cada usuário deve utilizar sua conta, manter suas credenciais em sigilo e registrar informações verdadeiras e necessárias às operações.</p>
        <p>As ações de cadastro, alteração e exclusão podem ser registradas com o usuário, a unidade e a data da solicitação para fins de segurança, rastreabilidade e melhoria do serviço.</p>
      </section>
      <section>
        <h2>Política de privacidade</h2>
        <p>Coletamos nome, e-mail, unidade selecionada e registros operacionais estritamente para autenticação, atendimento e controle das atividades. Os dados devem ser acessados somente por pessoas autorizadas e mantidos pelo período necessário às finalidades administrativas e legais.</p>
        <p>Para solicitar correção, acesso ou exclusão de dados, procure o responsável pela administração do sistema. O tratamento deve observar a legislação aplicável, incluindo a Lei Geral de Proteção de Dados (LGPD).</p>
      </section>
    </main>
  `,
  styles: [`
    :host { display: block; }
    .legal-page { background: #f1f5f9; color: #334155; min-height: 100vh; padding: 3rem max(1.5rem, calc((100vw - 56rem) / 2)); }
    .back-link { color: #0c3558; font-size: 1rem; font-weight: 700; }
    h1 { color: #0c3558; font-size: 2rem; margin: 2rem 0 .5rem; }
    h2 { color: #0c3558; font-size: 1.35rem; margin-top: 2rem; }
    p { font-size: 1rem; line-height: 1.7; }
    .lead { color: #475569; }
  `],
})
export class TermosComponent {}
