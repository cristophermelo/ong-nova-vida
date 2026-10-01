// ==================================================
// templates.js — Geração de componentes via <template>
// ==================================================

export function renderizarLista(containerId, dados, templateId, preencher) {
    const container = document.getElementById(containerId);
    const template = document.getElementById(templateId);

    if (!container || !template) return;

    const fragmento = document.createDocumentFragment();

    dados.forEach((item) => {
        const clone = template.content.cloneNode(true);
        preencher(clone, item);
        fragmento.appendChild(clone);
    });

    container.innerHTML = '';
    container.appendChild(fragmento);
}

export function preencherItemLista(clone, texto) {
    const li = clone.querySelector('li');
    if (li) li.textContent = texto;
}

// Dados de origem (poderiam vir de uma API no futuro)
export const materiaisDoacao = [
    'Alimentos não perecíveis',
    'Produtos de higiene',
    'Roupas em bom estado',
    'Materiais escolares'
];

export const formasVoluntariado = [
    'Auxiliar nas campanhas de arrecadação',
    'Apoiar atividades comunitárias',
    'Organizar materiais recebidos',
    'Participar dos eventos da ONG'
];

// --------------------------------------------------
// Inicialização das listas da página Projetos
// --------------------------------------------------
export function inicializarListas() {
    renderizarLista('lista-doacoes', materiaisDoacao, 'template-item', preencherItemLista);
    renderizarLista('lista-voluntariado', formasVoluntariado, 'template-item', preencherItemLista);
}