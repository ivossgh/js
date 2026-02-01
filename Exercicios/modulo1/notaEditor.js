// No nosso documento html vamos atras dos IDS | DOM conversando com HTML

// Pega o campo de digitação para sabermos o que o usuário escreveu
let entrada = document.getElementById("entrada")
// Pega o botão de salvar para sabermos quando o usuário clicou nele
let btn = document.getElementById("salvar")
// Pega a lista (ul ou ol) onde vamos pendurar os nossos itens depois
let lista = document.getElementById("lista")
// Pega o botão de limpar para sabermos quando apagar tudo
let brnlimpar = document.getElementById("limpar")


// --- BANCO DE DADOS: Recuperando o que já estava salvo ---

// Aqui a gente tenta buscar as reflexões que salvamos antes. 
// se não existir, inicia vazio []
let reflexoes = JSON.parse(localStorage.getItem("minhas_reflexoes")) || [];

// Assim que a página abre, a gente já desenha na tela o que veio do banco de dados
renderizar()

// --- DESENHISTA: A função que coloca as coisas na tela ---

function renderizar(){

 // Antes de desenhar, a gente limpa a lista no HTML para não repetir itens velhos
    lista.innerHTML = "";

// Usamo o for para percorrer minha lista reflexoes
    reflexoes.forEach(texto =>{

// Variavel li vamos criar varios items que no final será as entradas dos users
        let li = document.createElement("li")

// Colocamos o texto do usuário dentro desse li
        li.textContent = texto

// A minha lista no html adcionamos todos os Li/items que vamos criando
        lista.appendChild(li)
    })
}

// --- AÇÃO: O que acontece quando clicamos em SALVAR ---

btn.addEventListener("click", function(){

// Texto vai receber as entradas dos usuarios
    let texto = entrada.value;

// Se o usuário não digitou nada, a gente para o código aqui e não faz nada
    if (texto === "") return;

// Minha lista de reflexoes vai receber todos os items, atraves do push
    reflexoes.push(texto)

// Pegamos a lista inteira atualizada e guardamos no "cofre" do navegador (localStorage)
// Usamos JSON.stringify porque o cofre só aceita guardar texto, não listas vivas
    localStorage.setItem("minhas_reflexoes", JSON.stringify(reflexoes));

// Zera meu input para iniciar o ciclo novamente
    entrada.value = "";

// Repitimos o ciclo ao chamar a funcao novamente
    renderizar()
})

// --- FAXINA: O que acontece quando clicamos em LIMPAR ---

brnlimpar.addEventListener("click", function(){
// Esvaziamos a nossa lista de memória (deixamos ela zerada)
    reflexoes = [];
    
// Vamos lá no "cofre" do navegador e deletamos a chave com nossas reflexões
    localStorage.removeItem("minhas_reflexoes");
    renderizar()
})

