// Pegamos o botão de salvar pelo ID
const btn = document.getElementById("salvar")

// Pegamos o espaço onde o usuário vai digitar o texto (editor)
const espaco = document.getElementById("espaco-do-editor")

// Pegamos o botão que limpa os dados
const brnlimpar = document.getElementById("limpar")

// Pegamos o menu de comandos (que aparece ao digitar "/")
const menu = document.getElementById("menu-comandos")


// Tornamos o elemento editável, como se fosse um editor de texto
espaco.contentEditable = true

// Definimos um texto inicial, funcionando como um "placeholder"
espaco.innerText = "Digite seu Titulo..."


// Estilizações feitas via JavaScript
espaco.style.padding = "20px";        // Espaçamento interno
espaco.style.minHeight = "300px";     // Altura mínima do editor
espaco.style.outline = "none";        // Remove a borda azul ao focar
espaco.style.fontSize = "18px";       // Tamanho da fonte
espaco.style.color = "#aaa";          // Cor cinza (estilo placeholder)


// Escutamos qualquer tecla pressionada no documento inteiro
document.addEventListener("keydown", (e) =>{

    // Se a tecla pressionada for "/"
    if(e.key == "/"){

        // Pegamos a seleção atual do cursor
        const selecao = window.getSelection();

        // Pegamos o "range", que é a posição do cursor
        const range = selecao.getRangeAt(0);

        // Pegamos as coordenadas do cursor na tela
        const rect = range.getBoundingClientRect();

        // Mostramos o menu de comandos
        menu.style.display = "block";

        // Posicionamos o menu horizontalmente no local do cursor
        menu.style.left = `${rect.left + window.scrollX}px`;

        // Posicionamos o menu logo abaixo do cursor
        menu.style.top = `${rect.bottom + window.scrollX}px`;
    }

    // Se a tecla pressionada for ESC
    if (e.key === "Escape"){
        // Escondemos o menu
        menu.style.display = "none"
    }
})


// Escutamos cliques dentro do menu de comandos
menu.addEventListener("click", (e) =>{

    // Verifica se o clique foi em um item válido do menu
    const item = e.target.closest(".item-menu")

    // Se não clicou em um item do menu, não faz nada
    if (!item) return;

    // Pegamos o tipo de elemento a ser criado (ex: h1, p, etc.)
    const tipo = item.getAttribute("data-tipo");

    // Criamos dinamicamente o elemento HTML
    const novoElemento = document.createElement(tipo)

    // Tornamos o novo elemento editável
    novoElemento.contentEditable = true

    // Começa vazio
    novoElemento.innerText = "";

    // Adicionamos uma classe para estilização
    novoElemento.className = "Editavel";

    // Inserimos o novo elemento no body
    document.body.appendChild(novoElemento)

    // Escondemos o menu
    menu.style.display = "none";

    // Colocamos o foco no novo elemento
    novoElemento.focus()
})


// Se o usuário clicar fora do menu
document.addEventListener("click", (e) =>{

    // Se o clique não foi dentro do menu
    if(!menu.contains(e.target)){
        // Escondemos o menu
        menu.style.display = "none";
    }
})


// Tentamos buscar os devocionais salvos no localStorage
// Se não existir nada, usamos um array vazio
const devocionais = JSON.parse(localStorage.getItem("devocionais")) || []


// Quando o botão salvar for clicado
btn.addEventListener("click", function(){

    // Pegamos o conteúdo do editor (com HTML)
    let conteudo = espaco.innerHTML

    // Se estiver vazio ou com texto inválido, não salva
    if (conteudo === "" || conteudo === "Digite algo") return;
    
    // Adicionamos o conteúdo ao array
    devocionais.push(conteudo)

    // Salvamos o array no localStorage (convertendo para JSON)
    localStorage.setItem("devocionais", JSON.stringify(devocionais))

    // Mensagem no console para confirmar
    console.log("Devocional Adcionado com Sucesso")

    // Limpamos o editor
    espaco.innerHTML = ""

    // Colocamos o foco novamente no editor
    espaco.focus()
})


// Função para carregar os devocionais salvos
function carregar(){

    // Buscamos os dados no localStorage
    const devsBaixados = localStorage.getItem("devocionais")
    
    // Se existir algo salvo
    if (devsBaixados){

       // Convertemos de JSON para array
       const devsConvertidos = JSON.parse(devsBaixados)

       // Mostramos no console
       console.log(devsConvertidos) 

       // Retornamos os dados
       return devsConvertidos
    }else{
        // Caso não exista nada salvo
        console.log("Nenhum devocional encontrado.")
    }
}


// Quando o botão limpar for clicado
brnlimpar.addEventListener("click", function(){

    // Zeramos o array de devocionais
    devocionais = [];
    
    // Removemos os dados salvos do localStorage
    localStorage.removeItem("devocionais");

    // Resetamos o texto do editor
    espaco.innerHTML = "Digite seu Titulo...";

    // Mensagem de confirmação
    console.log("🗑️ Banco de dados limpo");
})
