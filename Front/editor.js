// 1. SELEÇÃO DE ELEMENTOS DO HTML

const content = document.getElementById('content'); // Onde eu digito
const btnSave = document.getElementById('btn-save'); // Botao de salvar
const btnSemelhanca = document.getElementById('semelhanca'); // Botao de verificar semelhança
const status = document.getElementById('status'); // Mensagem de erro ou sucesso
const historico = document.getElementById('historico'); // Onde ficam as anotações salvas


// 2. FUNÇÕES DE PROCESSAMENTO (LÓGICA)


// Função para tratar o texto (Útil para o seu futuro algoritmo de recomendação)
function trabalharTexto(texto) {
  return texto
    .toLowerCase()
    .replace(/[^\w\s]/gi, '') // Remove símbolos e mantém letras/números
    .trim(); // Remove espaços extras nas pontas
}

function bagOfWords(texto) {
  return texto
  .toLowerCase()
  .replace(/[^\w\s]/gi, '') // Remove símbolos e mantém letras/números
  .trim() // removemos espacos no inico e fim
  .split(/\s+/); // Dividimos o texto em palavras usando espaços como separadores
}

function contFreq(palavras){
  const freq = {}; // Objeto vazio para armazenar as frequências
  palavras.forEach(palavra => { // Para cada palavra na lista
    freq[palavra] = (freq[palavra] || 0) + 1; // Incrementa a contagem da palavra
  });
  return freq;
}

// Função para calcular similaridade entre dois textos usando interseção de palavras
function similaridadePorIntersecao(texto1, texto2) {
  // Convertemos os textos em listas de palavras
  const palavras1 = bagOfWords(texto1);
  const palavras2 = bagOfWords(texto2);

  // Criamos conjuntos (sets) para eliminar duplicatas
  const set1 = new Set(palavras1);
  const set2 = new Set(palavras2);

  let intersecao = 0;

  // Calculamos o tamanho da interseção
  set1.forEach(palavra => {
    if (set2.has(palavra)){
      intersecao++;
    }
  });

  const union = new Set([...set1, ...set2]);

  if (union.size === 0) return 0; // Evita divisão por zero
  return intersecao / union.size; // Similaridade = Tamanho da interseção / Tamanho da união
}

// Cria uma função chamada formatDoc que recebe o nome do comando (ex: 'bold' ou 'italic')
function formatDoc(command) {
  // Coloca o cursor (foco) dentro da área de texto antes de aplicar a formatação
  content.focus();
  
  // Executa o comando de formatação no texto que estiver selecionado pelo usuário
  document.execCommand(command, false, null);
}

function TextoSemelhante(textoAtual){
  let melhorSimilaridade = 0;
  let melhorNota = null;

  // BUSCA CORRETA: Pegamos as anotações do localStorage para comparar
  const anotacoesSalvas = JSON.parse(localStorage.getItem("anotacoes")) || [];

  anotacoesSalvas.forEach(registro => {
    const sim = similaridadePorIntersecao(textoAtual, registro.texto);
    // Definimos um limite mínimo (ex: 20% de semelhança) para não sugerir coisas aleatórias
    if (sim > melhorSimilaridade && sim > 0.2){ 
      melhorSimilaridade = sim;
      melhorNota = registro;
    }
  });
  
  return melhorNota; // RETORNO: Agora a função devolve o resultado
}

function sugerirAnotacao(){
  const textoAtual = content.innerText.trim();
  
  if(textoAtual === "" || textoAtual === "Digite seu texto") {
      alert("Digite algo para comparar!");
      return;
  }

  const resultado = TextoSemelhante(textoAtual);

  if (resultado){
    // Exibimos a data e um pedaço do texto encontrado
    alert("Encontramos uma nota parecida do dia: " + resultado.data + "\n\nConteúdo: " + resultado.texto.substring(0, 50) + "...");
  }else{
    alert("Nenhuma anotação parecida encontrada.");
  }
}

// 3. FUNÇÕES DE INTERFACE (UI / EXIBIÇÃO)


function Historico() {
  // Zera a area de texto para não duplicar ao atualizar
  historico.innerHTML = "";

  // Buscamos as anotacoes salvas no localStorage
  const anotacoes = JSON.parse(localStorage.getItem("anotacoes")) || [];

  // Se nao tiver nada salva, retorna a a mensagem abaixo
  if (anotacoes.length === 0) {
    historico.innerHTML = "<p>Nenhuma anotação salva.</p>";
    return;
  }

  // Vou percorrrer minha lista de anotacoes uma por uma e para cada uma delas, ela vai executar os passos abaixo
  anotacoes.forEach((nota, index) => {
    // criamos uma div nova para cada anotacao
    const notaElement = document.createElement("div");
    // aqui adicionamos a classe nota para estilizar
    notaElement.classList.add("nota");

    notaElement.innerHTML = ` 
      <small>${nota.data}</small> 
      <div class="nota-content">${nota.html}</div>
    `;

    // adcionamos dentro do elemento historico que esta no html
    historico.appendChild(notaElement);
  });
}


// 4. EVENTOS (CLIQUES E CARREGAMENTO)

// Evento para o botão de semelhança que estava faltando!
btnSemelhanca.addEventListener('click', sugerirAnotacao);

// Adiciona um evento de clique no botao de salvar
btnSave.addEventListener('click', () => {
  const html = content.innerHTML;
  const textoLimpo = content.innerText.trim(); 

  if (textoLimpo === "" || textoLimpo === "Digite seu texto") {
    status.innerText = "Não é possível salvar uma anotação vazia";
    return; 
  }

  const anotacao = {
    data: new Date().toLocaleDateString('pt-BR'), 
    html: html, 
    texto: textoLimpo 
  };

  let anotacoes = JSON.parse(localStorage.getItem("anotacoes")) || [];
  anotacoes.push(anotacao);
  localStorage.setItem('anotacoes', JSON.stringify(anotacoes));

  status.innerText = "Anotação salva com sucesso!";
  Historico();
  content.innerHTML = "Digite seu texto";
});

// Carregamos as anotacoes salvas ao dar f5 na pag
window.addEventListener("load", () => {
  console.log("Sistema carregado. Buscando histórico...");
  Historico();
});