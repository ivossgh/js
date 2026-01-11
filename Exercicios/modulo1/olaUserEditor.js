function adcionarParticipante(){
// Passamos a mensagem a ser exibida aqui e nao no HTML
    let mensagem = "Participante Adcionado com Sucesso";

// Fomos no HTML para pegramos o que o user digitar
    let inputNome = document.getElementById("inputNome")

// Passamos o que ele digita para var name
    let nome = inputNome.value

// Indo atrás do ID no HTML
    document.getElementById(mensagem)

// Indo atrás do ID no HTML
    let listaParticipantes = document.getElementById("listaParticipantes")

// Var que receberá os meus items
    let novoParticipante = document.createElement("li")

// Passamos o que o user digita para os li/items da lista do HTML
    novoParticipante.textContent = nome

// Adcionamos eles a lista
    listaParticipantes.appendChild(novoParticipante)

// Zeramos o input para começar tudo denovo
    inputNome.value = ""
                  
}