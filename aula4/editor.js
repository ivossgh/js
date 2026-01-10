//Variavel em escopo global para todas as funcoes poderem acessar

let tarefas = []

function adicionarTarefa() {

  // Mensagem a ser exibida ao usuer enviar a tarefa, essa var está no html
    let mensagem = "Tarefa adicionada com sucesso!";
  // Pegamos o texto digitado pelo user. inputTarefa no html. como nao vai mudar, usamos const de constante

    const inputTarefa = document.getElementById("inputTarefa")

  // Esse texto de inputTarefa vai ser armazenado na var tarefas
    let tarefa = inputTarefa.value.trim()
    
  // Boas praticas, teriamos que usar o "mesmo" codigo duas vezes, melhor criar um variavel e depois puxar ela
    const mensagens = document.getElementById("mensagem")

  // Verifica se foi preenchido o campo de input ou näo
    if (tarefa == ""){
        let mensagemError = "Digite uma Tarefa para prosseguir!";
        mensagens.textContent = mensagemError;
        mensagens.style.color = "#a34743";
    
  // Vamos atras do id mensagem no html para passar ela. nesse cao, "Tarefa adicionada com sucesso!"
    }else{
      mensagens.textContent = mensagem;
      mensagens.style.color = "#29cc3fff";

  // Empurrando minhas tarefas para minha lista 
      tarefas.push(tarefa)
  // Chamando a funçäo abaixo
      renderizarTarefas()
  
  // AO user enviar a tarefa, limpamos o campo de input
    inputTarefa.value = ""
    }
}

function renderizarTarefas(){
  // Criamos uma lista no html e armazanamos em listaTarefas(Pai)
    const listaTarefas = document.getElementById("listaTarefas")
  // Zerando a lista
    listaTarefas.innerHTML=""

  // Percorrendo a lista para devolver individualmente, enquanto ele for menor que o tamanho da lista
    let i = 0
    for (i; i < tarefas.length; i++){

  // Criamos os itens ou Li da lista (Pai) e armazenamos a var novaTarefa(Os inputs)
      let novaTarefa = document.createElement("li")

  // Aqui pegamos o que o user digita e alocamos na nossa var novaTarefa, individualmente
      novaTarefa.textContent = tarefas[i]

  // Aqui a nossa lista Pai adcionamos itens Filho(os inputs do user)
      listaTarefas.appendChild(novaTarefa)
    }
}
