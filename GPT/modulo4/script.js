// --- PREPARAÇÃO DO EDITOR DE TEXTO LIVRE ---

const btn = document.getElementById("salvar")

// 1. Criamos uma DIV em vez de H1 ou P, porque DIVs são perfeitas para "containers" de texto
const editor = document.createElement('div');

// 2. Ativamos o modo escrita total
editor.contentEditable = true;

// 3. Texto de ajuda (placeholder)
editor.innerHTML = "Comece a escrever sua reflexão livremente aqui...";

// 4. Estilo de "Folha de Papel" (Texto Livre)
editor.style.width = "100%";
editor.style.minHeight = "300px"; // Já começa com um espaço grande para escrever
editor.style.border = "1px solid #ccc";
editor.style.padding = "20px";
editor.style.marginTop = "20px";
editor.style.lineHeight = "1.6"; // Espaçamento entre linhas para facilitar a leitura
editor.style.outline = "none"; // Remove aquela borda preta estranha ao clicar

// Adiciona o editor na tela
document.body.appendChild(editor);

// BANCO DE DADOS: Recupera as notas salvas
let reflexoes = JSON.parse(localStorage.getItem("notas_livres")) || [];

// --- LÓGICA DE SALVAR ---

btn.addEventListener("click", function() {
    // 5. Pegamos o innerHTML para manter as quebras de linha que o usuário fizer com Enter
    let conteudo = editor.innerHTML;

    // Se estiver vazio ou for apenas o texto inicial, não salva
    if (conteudo === "" || conteudo === "Comece a escrever sua reflexão livremente aqui...") return;

    // Salva o bloco inteiro de texto como uma única nota
    reflexoes.push(conteudo);
    localStorage.setItem("notas_livres", JSON.stringify(reflexoes));

    console.log("Nota salva com sucesso!");
    
    // Limpa o editor para a próxima nota
    editor.innerHTML = "";
    editor.focus();
});

// --- COMPORTAMENTO NATURAL ---

// Ao clicar no editor, se tiver o texto inicial, ele limpa automaticamente para o usuário
editor.addEventListener("focus", function() {
    if (editor.innerHTML === "Comece a escrever sua reflexão livremente aqui...") {
        editor.innerHTML = "";
    }
});
