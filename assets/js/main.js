// Seleciona o formulário pelo ID
const form = document.querySelector('#form');

// Escuta o evento de envio do formulário
form.addEventListener('submit', function (event) {
    // Impede o recarregamento da página
    event.preventDefault();

    // event.target representa o formulário que disparou o evento
    // form.querySelector
    const inputPeso = event.target.querySelector('#peso');
    const inputAltura = event.target.querySelector('#altura');

    // Converte os valores dos inputs para Number
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    // Validação do peso
    if (!peso) {
        setRes('Peso inválido.', false);
        return;
    }

    // Validação da altura
    if (!altura) {
        setRes('Altura inválida.', false);
        return;
    }

    // Calcula o IMC
    const imc = getImc(peso, altura);

    // Obtém a classificação do IMC
    const nivelImc = getNivelImc(imc);

    // Monta a mensagem de resultado
    const msg = `Seu IMC é ${imc} (${nivelImc}).`;

    // Exibe o resultado na tela
    setRes(msg, true);
});


/**
 * Retorna a classificação do IMC.
 * @param {number} imc
 * @returns {string}
 */
function getNivelImc(imc) {
    const nivel = [
        'Abaixo do peso',
        'Peso normal',
        'Sobrepeso',
        'Obesidade grau 1',
        'Obesidade grau 2',
        'Obesidade grau 3'
    ];

    if (imc >= 40) return nivel[5];
    if (imc >= 35) return nivel[4];
    if (imc >= 30) return nivel[3];
    if (imc >= 25) return nivel[2];
    if (imc >= 18.5) return nivel[1];

    return nivel[0];
}


/**
 * Calcula o Índice de Massa Corporal (IMC).
 * Fórmula: peso / altura²
 *
 * @param {number} peso
 * @param {number} altura
 * @returns {number}
 */
function getImc(peso, altura) {
    const imc = peso / (altura ** 2);

    // Limita o resultado para duas casas decimais
    return Number(imc.toFixed(2));
}


/**
 * Cria dinamicamente um elemento <p>.
 *
 * @returns {HTMLParagraphElement}
 */
function criaP() {
    return document.createElement('p');
}


/**
 * Exibe uma mensagem de resultado na tela.
 *
 * @param {string} msg
 * @param {boolean} isValid
 */
function setRes(msg, isValid) {
    const res = document.querySelector('#res');

    // Limpa resultados anteriores
    res.innerHTML = '';

    // Cria o parágrafo que exibirá a mensagem
    const p = criaP();

    // Define a classe CSS de acordo com o tipo de mensagem
    //p.classList.add('paragrfo-resultudo')-Colocando uma classe no p 
    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    // Insere o texto no parágrafo
    p.innerHTML = msg;

    // Adiciona o parágrafo dentro da div de resultado
    res.appendChild(p);
}