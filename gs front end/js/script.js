let imagensObjetivos = document.querySelectorAll(".Objetivos-imagens img");
let botaoAnterior = document.getElementById("imagem-anterior");
let botaoProxima = document.getElementById("imagem-proxima");
let contadorImagem = document.getElementById("contador-imagem");
let indiceAtual = 0;

function mostrarImagem() {
    for (let i = 0; i < imagensObjetivos.length; i++) {
        if (i === indiceAtual) {
            imagensObjetivos[i].style.display = "block";
        } else {
            imagensObjetivos[i].style.display = "none";
        }
    }

    contadorImagem.textContent =
        (indiceAtual + 1) + " de " + imagensObjetivos.length;
}

mostrarImagem();

botaoProxima.addEventListener("click", function () {
    indiceAtual++;

    if (indiceAtual >= imagensObjetivos.length) {
        indiceAtual = 0;
    }

    mostrarImagem();
});

botaoAnterior.addEventListener("click", function () {
    indiceAtual--;

    if (indiceAtual < 0) {
        indiceAtual = imagensObjetivos.length - 1;
    }

    mostrarImagem();
});

let formularioConsulta = document.getElementById("form-consulta");
let enderecoConsulta = document.getElementById("endereco-consulta");
let mensagemFormulario = document.getElementById("mensagem-formulario");
let resultadoConsulta = document.getElementById("resultado-consulta");
let enderecoResultado = document.getElementById("endereco-resultado");
let chuvaConsulta = document.getElementById("chuva-consulta");
let nivelConsulta = document.getElementById("nivel-consulta");
let statusConsulta = document.getElementById("status-consulta");
let alertaConsulta = document.getElementById("alerta-consulta");

// DADOS DE DEMONSTRAÇÃO: estes números serão ajustados
let chuvaAtencao = 20;
let chuvaCritico = 50;
let nivelAtencao = 30;
let nivelCritico = 60;

let leiturasDemonstracao = [
    {
        endereco: "Ricardo Jafet x Paulo Bregaro",
        chuva: 25,
        nivel: 35
    },
    {
        endereco: "Teresa Cristina x Tabor",
        chuva: 55,
        nivel: 70
    }
];

function classificarLeitura(valor, limiteAtencao, limiteCritico) {
    if (valor >= limiteCritico) {
        return "Crítico";
    } else if (valor >= limiteAtencao) {
        return "Atenção";
    } else {
        return "Normal";
    }
}

formularioConsulta.addEventListener("submit", function (event) {
    event.preventDefault();

    mensagemFormulario.textContent = "";
    resultadoConsulta.hidden = true;

    let enderecoDigitado = enderecoConsulta.value.trim().toLowerCase();

    if (enderecoDigitado === "") {
        mensagemFormulario.textContent = "Digite um endereço para consultar.";
        return;
    }

    let leituraEncontrada = null;

    for (let i = 0; i < leiturasDemonstracao.length; i++) {
        let enderecoCadastrado =
            leiturasDemonstracao[i].endereco.toLowerCase();

        if (enderecoDigitado === enderecoCadastrado) {
            leituraEncontrada = leiturasDemonstracao[i];
            break;
        }
    }

    if (leituraEncontrada === null) {
    leituraEncontrada = {
        endereco: enderecoConsulta.value.trim(),
        chuva: Math.floor(Math.random() * 80),
        nivel: Math.floor(Math.random() * 100)
    };

    mensagemFormulario.textContent =
        "Endereço sem leitura estudada: resultado aleatório para demonstração.";
}

    let statusChuva = classificarLeitura(
        leituraEncontrada.chuva,
        chuvaAtencao,
        chuvaCritico
    );

    let statusNivel = classificarLeitura(
        leituraEncontrada.nivel,
        nivelAtencao,
        nivelCritico
    );

    let statusFinal = "Normal";

    if (statusChuva === "Atenção" || statusNivel === "Atenção") {
        statusFinal = "Atenção";
    }

    if (statusChuva === "Crítico" || statusNivel === "Crítico") {
        statusFinal = "Crítico";
    }

    let textoAlerta = "Sem alerta nos dados demonstrativos.";

    if (statusFinal === "Atenção") {
        textoAlerta = "Atenção nos dados demonstrativos.";
    } else if (statusFinal === "Crítico") {
        textoAlerta = "Alerta crítico nos dados demonstrativos.";
    }

    enderecoResultado.textContent = leituraEncontrada.endereco;
    chuvaConsulta.textContent = leituraEncontrada.chuva;
    nivelConsulta.textContent = leituraEncontrada.nivel;
    statusConsulta.textContent = statusFinal;
    alertaConsulta.textContent = textoAlerta;

    resultadoConsulta.hidden = false;
});