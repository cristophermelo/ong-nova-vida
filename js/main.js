// ==================================================
// main.js — Ponto de entrada da aplicação
// ==================================================

import { inicializarRouter, registrarCallbackNavegacao } from './router.js';
import { inicializarListas } from './templates.js';
import { inicializarFormulario } from './form.js';
import { restaurarHistoricoNaInterface } from './historico.js';
import { inicializarGrafico } from './chart.js';
import { restaurarTema, inicializarBotaoTema } from './theme.js';

// --------------------------------------------------
// Função que roda após cada navegação SPA
// --------------------------------------------------
function aoTrocarDePagina() {
    inicializarListas();
    restaurarHistoricoNaInterface();
    inicializarGrafico();
}

// --------------------------------------------------
// Inicialização geral
// --------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Serviços globais (não dependem da rota)
    restaurarTema();
    inicializarBotaoTema();
    inicializarFormulario();

    // Router
    inicializarRouter();
    registrarCallbackNavegacao(aoTrocarDeDePagina);

    // Renderização inicial
    aoTrocarDeDePagina();
});