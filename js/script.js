import { perguntas } from './perguntas.js';
import { nome } from './aleatorio.js';

const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');
const novamenteBtn = document.querySelector('.novamente-btn');
const iniciarBtn = document.querySelector('.iniciar-btn');
const telaInicial = document.querySelector('.tela-inicial');

let indicePerguntaAtual = 0;
let historiaFinal = "";

iniciarBtn.addEventListener('click', () => {
    telaInicial.style.display = 'none';
    indicePerguntaAtual = 0;
    historiaFinal = "";
    mostrarPergunta();
    caixaPerguntas.style.display = 'block';
    caixaAlternativas.style.display = 'block';
    caixaResultado.classList.remove('mostrar');
});

novamenteBtn.addEventListener('click', () => {
    indicePerguntaAtual = 0;
    historiaFinal = "";
    textoResultado.innerHTML = '';
    caixaResultado.classList.remove('mostrar');
    mostrarPergunta();
    caixaPerguntas.style.display = 'block';
    caixaAlternativas.style.display = 'block';
});

function mostrarPergunta() {
    const pergunta = perguntas[indicePerguntaAtual];
    caixaPerguntas.innerHTML = `<p>${pergunta.enunciado}</p>`;
    caixaAlternativas.innerHTML = '';

    pergunta.alternativas.forEach((alternativa, index) => {
        const btn = document.createElement('button');
        btn.innerText = alternativa.texto;
        btn.addEventListener('click', () => selecionarAlternativa(index));
        caixaAlternativas.appendChild(btn);
    });
}

function selecionarAlternativa(indiceAlternativa) {
    const pergunta = perguntas[indicePerguntaAtual];
    const alternativa = pergunta.alternativas[indiceAlternativa];

    alternativa.afirmacao.forEach(afirmacao => {
        historiaFinal += `<p>${afirmacao}</p>`;
    });

    if (alternativa.proxima !== undefined) {
        indicePerguntaAtual = alternativa.proxima;
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    caixaPerguntas.style.display = 'none';
    caixaAlternativas.style.display = 'none';
    textoResultado.innerHTML = historiaFinal;
    caixaResultado.classList.add('mostrar');
}
