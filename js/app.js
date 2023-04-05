async function conexao() {
    const conexao = await fetch("http://localhost:3000/Jogos");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

const lista = document.querySelector('[data-lista]')



//exibi os jogos na tela
function constroidCard(nome, genero, imagem) {
    const card = document.createElement('div');
    card.className = 'jogos__card';
    card.innerHTML = `
    <figure class="jogos__card-figure">
    <img src="${imagem}" alt="" class="jogos__img">
    <figcaption>
    <h2 class="jogos__nome"><span class="jogos__informacoes">TITULO:</span> ${nome}</h2>
    <h3 class="jogos__genero"><span class="jogos__informacoes">GENÊRO:</span> ${genero}</h3>
    </figcaption>
    </figure>
    </div>
    `
    return card;
}

async function listaCards() {
    const listaJogs = await conexao();
    listaJogs.forEach(e => lista.appendChild(
        constroidCard(e.Nome, e.Genero, e.Imagem)
    ));
}

listaCards();

//criando cards novos
// criaCard(nome, genero,imagem)


async function criaCard(nome, genero, imagem) {
    const conexao = await fetch("http://localhost:3000/Jogos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            Nome: nome,
            Genero: genero,
            Imagem: imagem
        })
    });

    const conexaoConvertidada = await conexao.json();

    return conexaoConvertidada
};

const formulario = document.querySelector("[data-form]")

async function criaCardDoZero(e) {
    e.preventDefault();
    
    const nome = document.querySelector('[data-nome]').value;
    const genero = document.querySelector('[data-genero]').value;
    const imagem = document.querySelector('[data-imagem]').value;
    
    try {
        await criaCard(nome, genero, imagem);

        window.location.href = "../index.html";
        
    } catch (error) {
        alert(e);
    }
    
}

formulario.addEventListener("submit", e => criaCardDoZero(e));

const voltar = document.querySelector('.voltar');

voltar.addEventListener('click', e => window.location.href = "../index.html")