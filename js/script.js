import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');
const novamenteBtn = document.querySelector('.novamente-btn');
const iniciarBtn = document.querySelector('.iniciar-btn');
const telaInicial = document.querySelector('.tela-inicial');

let indicePerguntaAtual = 0;

iniciarBtn.addEventListener('click', () => {
    telaInicial.style.display = 'none';
    mostrarPergunta(indicePerguntaAtual);
    caixaPerguntas.style.display = 'block';
    caixaAlternativas.style.display = 'block';
});

novamenteBtn.addEventListener('click', () => {
    indicePerguntaAtual = 0;
    textoResultado.innerHTML = '';
    caixaResultado.classList.remove('mostrar');
    mostrarPergunta(indicePerguntaAtual);
    caixaPerguntas.style.display = 'block';
    caixaAlternativas.style.display = 'block';
});

function mostrarPergunta(indice) {
    const pergunta = perguntas[indice];
    caixaPerguntas.innerHTML = `<p>${pergunta.enunciado}</p>`;
    caixaAlternativas.innerHTML = '';

    pergunta.alternativas.forEach((alternativa, index) => {
        const btn = document.createElement('button');
        btn.innerText = alternativa.texto;
        btn.addEventListener('click', () => selecionarAlternativa(indice, index));
        caixaAlternativas.appendChild(btn);
    });
}

function selecionarAlternativa(indicePergunta, indiceAlternativa) {
    const pergunta = perguntas[indicePergunta];
    const alternativa = pergunta.alternativas[indiceAlternativa];

    alternativa.afirmacao.forEach(afirmacao => {
        textoResultado.innerHTML += `<p>${afirmacao}</p>`;
    });

    if (alternativa.proxima !== undefined) {
        indicePerguntaAtual = alternativa.proxima;
        mostrarPergunta(indicePerguntaAtual);
    } else {
        caixaResultado.classList.add('mostrar');
        caixaPerguntas.style.display = 'none';
        caixaAlternativas.style.display = 'none';
    }
}
