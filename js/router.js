// ==================================================
// router.js — Navegação SPA
// ==================================================

const app = document.getElementById('app');

// Callbacks que o router vai chamar após cada navegação
const aoNavegar = [];

export function registrarCallbackNavegacao(callback) {
    aoNavegar.push(callback);
}

export async function carregarPagina(url, adicionarAoHistorico = true) {
    try {
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);

        const html = await resposta.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const novoConteudo = doc.querySelector('main');

        if (!novoConteudo) {
            app.innerHTML = '<p>Conteúdo não encontrado.</p>';
            return;
        }

        app.innerHTML = novoConteudo.innerHTML;

        if (adicionarAoHistorico) {
            history.pushState({ url }, '', url);
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Avisa todos os módulos interessados que a página mudou
        aoNavegar.forEach((cb) => cb());
    } catch (erro) {
        console.error('Erro ao carregar a página:', erro);
        app.innerHTML = '<p>Não foi possível carregar o conteúdo.</p>';
    }
}

export function inicializarRouter() {
    // Intercepta cliques em links internos
    document.addEventListener('click', (evento) => {
        const link = evento.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');

        if (
            !href ||
            href.startsWith('http') ||
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('tel:')
        ) {
            return;
        }

        evento.preventDefault();
        carregarPagina(href);
    });

    // Botões "voltar" e "avançar" do navegador
    window.addEventListener('popstate', (evento) => {
        const url = evento.state?.url || 'index.html';
        carregarPagina(url, false);
    });
}