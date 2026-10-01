// ==================================================
// form.js — Validação e envio do formulário
// ==================================================

import { salvarCadastro } from './storage.js';
import { restaurarHistoricoNaInterface } from './historico.js';

// --------------------------------------------------
// Mensagens de erro contextuais
// --------------------------------------------------
function obterMensagemErro(campo) {
    const nome = campo.name || 'campo';

    if (campo.validity.valueMissing) return `O campo "${nome}" é obrigatório.`;
    if (campo.validity.typeMismatch && campo.type === 'email')
        return 'Informe um e-mail válido (ex: nome@dominio.com).';
    if (campo.validity.patternMismatch) return campo.title || 'Formato inválido.';
    if (campo.validity.tooShort) return `Mínimo de ${campo.minLength} caracteres.`;
    return 'Valor inválido.';
}

// --------------------------------------------------
// Feedback visual do campo
// --------------------------------------------------
function atualizarFeedback(campo) {
    const proximo = campo.nextElementSibling;
    if (proximo && proximo.classList.contains('msg-erro')) proximo.remove();

    if (campo.checkValidity()) {
        campo.classList.remove('campo-invalido');
        campo.classList.add('campo-valido');
        return;
    }

    campo.classList.remove('campo-valido');
    campo.classList.add('campo-invalido');

    if (campo.dataset.tocado === 'true') {
        const msg = document.createElement('small');
        msg.className = 'msg-erro';
        msg.setAttribute('role', 'alert');
        msg.textContent = obterMensagemErro(campo);
        campo.insertAdjacentElement('afterend', msg);
    }
}

// --------------------------------------------------
// Inicializa todos os listeners de formulário
// --------------------------------------------------
export function inicializarFormulario() {

    document.addEventListener('input', (evento) => {
        const campo = evento.target;
        if (!campo.matches('input, textarea, select')) return;
        campo.dataset.tocado = 'true';
        atualizarFeedback(campo);
    });

    document.addEventListener('blur', (evento) => {
        const campo = evento.target;
        if (!campo.matches('input, textarea, select')) return;
        campo.dataset.tocado = 'true';
        atualizarFeedback(campo);
    }, true);

    document.addEventListener('submit', (evento) => {
        const form = evento.target;
        if (form.tagName !== 'FORM') return;

        evento.preventDefault();

        const campos = form.querySelectorAll('input, textarea, select');
        let todosValidos = true;

        campos.forEach((campo) => {
            campo.dataset.tocado = 'true';
            atualizarFeedback(campo);
            if (!campo.checkValidity()) todosValidos = false;
        });

        if (!todosValidos) {
            const primeiroInvalido = form.querySelector('.campo-invalido');
            if (primeiroInvalido) primeiroInvalido.focus();
            return;
        }

        const dados = Object.fromEntries(new FormData(form));
        salvarCadastro(dados);

        const nome = dados.nome || 'Visitante';

        const aviso = document.createElement('div');
        aviso.className = 'alert';
        aviso.setAttribute('role', 'status');
        aviso.innerHTML = `<strong>Obrigado, ${nome}!</strong> Seu cadastro foi salvo com sucesso.`;

        form.replaceWith(aviso);

        restaurarHistoricoNaInterface();
    });
}