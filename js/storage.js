// ==================================================
// storage.js — Persistência com localStorage
// ==================================================

const CHAVE_CADASTROS = 'novavida_cadastros';
const CHAVE_TEMA = 'novavida_tema';

// --------------------------------------------------
// Cadastros
// --------------------------------------------------
export function salvarCadastro(dados) {
    const historico = obterCadastros();
    dados.cadastradoEm = new Date().toISOString();
    historico.push(dados);
    localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(historico));
}

export function obterCadastros() {
    const bruto = localStorage.getItem(CHAVE_CADASTROS);
    return bruto ? JSON.parse(bruto) : [];
}

// --------------------------------------------------
// Tema
// --------------------------------------------------
export function salvarTema(tema) {
    localStorage.setItem(CHAVE_TEMA, tema);
}

export function obterTema() {
    return localStorage.getItem(CHAVE_TEMA) || 'claro';
}