// Objeto principal da anotação
// Guarda informações gerais da anotação e todos os blocos criados
const anotacao = {

  // Autor da anotação
  autor: "Ivo",

  // Array que vai armazenar todos os blocos adicionados
  blocos: []
};

// Função responsável por criar e adicionar um novo bloco à anotação
function adicionarBloco() {

  // Captura o tipo de bloco selecionado no <select>
  const tipo = document.getElementById("tipoBloco").value;

  // Captura o texto digitado no <textarea>
  const conteudo = document.getElementById("conteudoBloco").value;

  // Verifica se o conteúdo está vazio ou só com espaços
  // Se estiver, a função para aqui (boa prática)
  if (!conteudo.trim()) return;

  // Cria um objeto representando um bloco da anotação
  const bloco = {

    // Tipo do bloco (titulo, paragrafo, citacao, lista)
    tipo: tipo,

    // Texto que o usuário digitou
    conteudo: conteudo
  };

  // Adiciona o bloco criado dentro do array de blocos da anotação
  anotacao.blocos.push(bloco);

  // Limpa o campo de texto após adicionar o bloco
  document.getElementById("conteudoBloco").value = "";

  // Atualiza a visualização da anotação na tela
  renderizarAnotacao();
}

// Função responsável por exibir os blocos da anotação na tela
function renderizarAnotacao() {

  // Seleciona o elemento onde a anotação será exibida
  const preview = document.getElementById("preview");

  // Limpa o conteúdo atual para evitar duplicações
  preview.innerHTML = "";

  // Percorre todos os blocos armazenados na anotação
  anotacao.blocos.forEach(bloco => {

    // Variável que vai armazenar o elemento HTML a ser criado
    let elemento;

    // Decide qual elemento HTML criar com base no tipo do bloco
    switch (bloco.tipo) {

      // Se for um título, cria um <h1>
      case "titulo":
        elemento = document.createElement("h1");
        break;

      // Se for um parágrafo, cria um <p>
      case "paragrafo":
        elemento = document.createElement("p");
        break;

      // Se for uma citação, cria um <blockquote>
      case "citacao":
        elemento = document.createElement("blockquote");
        break;

      // Se for uma lista, cria um <li>
      case "lista":
        elemento = document.createElement("li");
        break;
    }

    // Insere o texto do bloco dentro do elemento criado
    elemento.textContent = bloco.conteudo;

    // Adiciona o elemento ao container de preview
    preview.appendChild(elemento);
  });
}
