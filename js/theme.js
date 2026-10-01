// ==================================================
// theme.js — Alternância de tema
// ==================================================

import { salvarTema, obterTema } from './storage.js';

export function aplicarTema(tema) {
    document.body.dataset.tema = tema;
    salvarTema(tema);
}

export function restaurarTema() {
    document.body.dataset.tema = obterTema();
}

export function inicializarBotaoTema() {
    document.addEventListener('click', (evento) => {
        const botao = evento.target.closest('#btn-tema');
        if (!botao) return;

        const temaAtual = document.body.dataset.tema === 'escuro' ? 'claro' : 'escuro';
        aplicarTema(temaAtual);
    });
}