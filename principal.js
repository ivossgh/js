const editor = document.createElement('div')
const btn = document.getElementById('salvar')

const mensagens = document.getElementById("mensagem")
const mensagemSucesso = "Anotação adicionada com sucesso"
const mensagemErro = "Digite uma anotação para salvar"


// 4. Estilo de "Folha de Papel" (Texto Livre)
editor.innerHTML = "";
editor.contentEditable = true
editor.style.width = "100%";
editor.style.minHeight = "300px"; // Já começa com um espaço grande para escrever
editor.style.border = "1px solid #ffffff"; // Cor da borda
editor.style.padding = "20px"; // Onde o cursor incia
editor.style.marginTop = "20px"; // Dintancia da caixinha de texto em relacao ao botao
editor.style.lineHeight = "1.6"; // Espaçamento entre linhas para facilitar a leitura
editor.style.outline = "none"; // Remove aquela borda preta estranha ao clicar


document.body.appendChild(editor);

let reflexoes = JSON.parse(localStorage.getItem("notas")) || []

function mostraMsg(texto, cor){
    mensagens.textContent = texto
    mensagens.style.color = cor
}

btn.addEventListener("click", function(){
    const conteudo = editor.innerHTML.trim()

    if (conteudo === ""){

        mostraMsg(mensagemErro, "#a34743")
        return
    }

    reflexoes.push(conteudo, "#29cc3f")
    localStorage.setItem("notas", JSON.stringify(reflexoes))

    mostraMsg(mensagemSucesso)
    editor.innerHTML = ""
    editor.focus()
})

