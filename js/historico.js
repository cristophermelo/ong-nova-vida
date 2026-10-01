// ==================================================
// historico.js — Renderização do histórico de cadastros
// ==================================================

import { obterCadastros } from './storage.js';

export function restaurarHistoricoNaInterface() {
    const historico = obterCadastros();
    const container = document.getElementById('historico-cadastros');
    if (!container) return;

    if (historico.length === 0) {
        container.innerHTML = '<p>Nenhum cadastro realizado ainda.</p>';
        return;
    }

    const template = document.getElementById('template-historico');
    if (!template) return;

    const fragmento = document.createDocumentFragment();

    historico.forEach((registro) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector('.hist-nome').textContent = registro.nome || '—';
        clone.querySelector('.hist-email').textContent = registro.email || '—';
        clone.querySelector('.hist-data').textContent =
            new Date(registro.cadastradoEm).toLocaleString('pt-BR');
        fragmento.appendChild(clone);
    });

    container.innerHTML = '';
    container.appendChild(fragmento);
}