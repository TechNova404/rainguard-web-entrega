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
let botaoLimparConsulta = document.getElementById("limpar-consulta");
let enderecoConsulta = document.getElementById("endereco-consulta");
let mensagemFormulario = document.getElementById("mensagem-formulario");
let resultadoConsulta = document.getElementById("resultado-consulta");
let enderecoResultado = document.getElementById("endereco-resultado");
let chuvaConsulta = document.getElementById("chuva-consulta");
let nivelConsulta = document.getElementById("nivel-consulta");
let statusConsulta = document.getElementById("status-consulta");
let alertaConsulta = document.getElementById("alerta-consulta");

// LIMITES DO PROJETO: chuva forte eleva o estado em um nível
let chuvaForte = 30;
let nivelAtencao = 10;
let nivelCritico = 25;

let leiturasDemonstracao = [
    {
        endereco: "Ricardo Jafet x Paulo Bregaro",
        chuva: 25,
        nivel: 10
    },
    {
        endereco: "Teresa Cristina x Tabor",
        chuva: 55,
        nivel: 25
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

    let enderecoDigitado =
    enderecoConsulta.value.trim().toLowerCase().replace(/\s+/g, " ");

    if (enderecoDigitado === "") {
        mensagemFormulario.textContent = "Digite um endereço para consultar.";
        return;
    }

    let leituraEncontrada = null;

    for (let i = 0; i < leiturasDemonstracao.length; i++) {
        let enderecoCadastrado =
             leiturasDemonstracao[i].endereco.trim().toLowerCase().replace(/\s+/g, " ");

        if (enderecoDigitado === enderecoCadastrado) {
            leituraEncontrada = leiturasDemonstracao[i];
            break;
        }
    }

    if (leituraEncontrada === null) {
    leituraEncontrada = {
        endereco: enderecoConsulta.value.trim(),
        chuva: Math.floor(Math.random() * 80),
        nivel: Math.floor(Math.random() * 41)
    };

    mensagemFormulario.textContent =
        "Endereço sem leitura estudada: resultado aleatório para demonstração.";
}

    let statusFinal = classificarLeitura(
        leituraEncontrada.nivel,
        nivelAtencao,
        nivelCritico
    );

    if (leituraEncontrada.chuva >= chuvaForte) {
        if (statusFinal === "Normal") {
            statusFinal = "Atenção";
        } else if (statusFinal === "Atenção") {
            statusFinal = "Crítico";
        }
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
    if (statusFinal === "Normal") {
    statusConsulta.style.color = "#167a3e";
} else if (statusFinal === "Atenção") {
    statusConsulta.style.color = "#9a6700";
} else {
    statusConsulta.style.color = "#c62828";
}
    alertaConsulta.textContent = textoAlerta;

    resultadoConsulta.hidden = false;
});

botaoLimparConsulta.addEventListener("click", function () {
    formularioConsulta.reset();
    mensagemFormulario.textContent = "";
    resultadoConsulta.hidden = true;
});