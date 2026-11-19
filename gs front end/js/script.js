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