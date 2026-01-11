function adicionarTarefa() {
  // Mensagem a ser exibida ao usuer enviar a tarefa, essa var está no html
    let mensagem = "Tarefa adicionada com sucesso!";
  // Pegamos o texto digitado pelo user. inputTarefa no html
    let inputTarefa = document.getElementById("inputTarefa")
  // Esse texto de inputTarefa vai ser armazenado na var tarefas
    let tarefa = inputTarefa.value

  // Vamos atras do id mensagem no html para passar ela. nesse cao, "Tarefa adicionada com sucesso!"
    document.getElementById("mensagem").textContent = mensagem;

  // Criamos uma lista no html e armazanamos em listaTarefas(Pai)
    let listaTarefas = document.getElementById("listaTarefas")

  // Criamos os itens ou Li da lista (Pai) e armazenamos a var novaTarefa(Os inputs)
    let novaTarefa = document.createElement("li")

  // Aqui pegamos o que o user digita e alocamos na nossa var novaTarefa
    novaTarefa.textContent = tarefa

  // Aqui a nossa lista Pai adcionamos itens Filho(os inputs do user)
    listaTarefas.appendChild(novaTarefa)
  
  // AO user enviar a tarefa, limpamos o campo de input
    inputTarefa.value = ""
    
}
