// Procura no seu HTML o editor e o menu de comandos
// É o elemento HTML pai que contém todos os blocos de texto.
const editor = document.getElementById("editor");
const commandMenu = document.getElementById("command-menu");

// Variável para rastrear o bloco ativo para o menu, quando aperto /
let activeBlockForMenu = null; 

// --- EVENTO PRINCIPAL DE TECLADO ---
editor.addEventListener("keydown", (event) => {

  // Bloco atualmente focado, cursor está nele
  const currentBlock = document.activeElement;
  // Verifica se é um bloco válido
  // Se o usuário clicar em algo que não seja um bloco, o código não prossegue
  if (!currentBlock || !currentBlock.classList.contains("block")) return;

  // O que vai acontecer ao clicar enter
  if (event.key === "Enter") {
    // Se o menu estiver aberto, o Enter pode ser usado para selecionar (opcional)
    // Por enquanto, apenas cria um novo parágrafo padrão

    // Sem isso, o navegador criaria uma quebra de linha dentro do mesmo bloco.
    event.preventDefault();

    // Criamos um bloco novo após o atual, por isso usamos a variavel acima criada
    createBlockAfter(currentBlock);
    // Fecha o menu de comandos se estiver aberto
    commandMenu.hidden = true;
  }

  // O que acontece ao clicar backspace
  if (event.key === "Backspace") {
    // "O bloco está vazio? Se sim, apague-o e jogue o cursor para o bloco de cima".
    handleBackspace(event, currentBlock);
  }

  // cuidam dessa lógica de "pular" entre elementos HTML diferentes.
  if (event.key === "ArrowUp") {
    navigateUp(event, currentBlock);
  }

  if (event.key === "ArrowDown") {
    navigateDown(event, currentBlock);
  }
});

// --- EVENTO DE INPUT (Para detectar o "/") ---
editor.addEventListener("input", (event) => {
  const block = document.activeElement;
  if (!block.classList.contains("block")) return;

  if (block.textContent === ".") {
    activeBlockForMenu = block;
    showCommandMenu(block);
  } else {
    commandMenu.hidden = true;
  }
});

// --- FUNÇÕES DO MENU DE COMANDOS ---

function showCommandMenu(block) {
  const rect = block.getBoundingClientRect();
  commandMenu.style.top = `${rect.bottom + window.scrollY}px`;
  commandMenu.style.left = `${rect.left}px`;
  commandMenu.hidden = false;
}

// Clique nas opções do menu
commandMenu.addEventListener("click", (event) => {
  const item = event.target.closest("[data-command]");
  if (!item || !activeBlockForMenu) return;

  const command = item.dataset.command;
  
  activeBlockForMenu.textContent = ""; // Remove o "/"
  setBlockType(activeBlockForMenu, command);

  commandMenu.hidden = true;
});

// Transforma o bloco conforme o comando do seu HTML
function setBlockType(block, type) {
  let newElement;

  switch (type) {
    case "heading-1":
      newElement = document.createElement("h1");
      break;
    case "heading-2":
      newElement = document.createElement("h2");
      break;
    case "list":
      newElement = document.createElement("li");
      // Se for lista, idealmente envolveríamos em uma <ul>, 
      // mas para simplificar, criamos o item de lista.
      break;
    case "quote":
      newElement = document.createElement("blockquote");
      break;
    case "code":
      newElement = document.createElement("pre");
      newElement.style.background = "#f4f4f4"; // Um estilo rápido de código
      break;
    case "divider":
      newElement = document.createElement("hr");
      newElement.contentEditable = "false"; // Divisor não se edita
      break;
    default:
      newElement = document.createElement("div");
  }

  newElement.className = "block";
  newElement.dataset.type = type; // Mantém o tipo no atributo data
  if (type !== "divider") newElement.contentEditable = "true";
  
  block.replaceWith(newElement);
  
  
  // Se não for divisor, foca no novo elemento
  if (type !== "divider") {
    newElement.focus();
  } else {
    // Se for divisor, cria um parágrafo vazio logo abaixo para continuar escrevendo
    createBlockAfter(newElement);
  }
}

// Fechar menu ao clicar fora
document.addEventListener("mousedown", (event) => {
  if (!commandMenu.contains(event.target)) {
    commandMenu.hidden = true;
  }
});

// --- FUNÇÕES DE MOVIMENTAÇÃO E CRIAÇÃO (AUXILIARES) ---

function createBlockAfter(block) {
  const newBlock = document.createElement("div");
  newBlock.className = "block";
  newBlock.dataset.type = "paragraph";
  newBlock.contentEditable = "true";
  editor.insertBefore(newBlock, block.nextSibling);
  newBlock.focus();
}

function handleBackspace(event, block) {
  const selection = window.getSelection();
  const isAtStart = selection.anchorOffset === 0;

  if (block.textContent === "" && editor.children.length > 1) {
    event.preventDefault();
    const prev = block.previousElementSibling;
    block.remove();
    if (prev) placeCursorAtEnd(prev);
    return;
  }

  if (isAtStart) {
    const prev = block.previousElementSibling;
    if (!prev || prev.tagName === "HR") return;

    event.preventDefault();
    const text = block.textContent;
    const oldLength = prev.textContent.length;

    block.remove();
    prev.textContent += text;
    placeCursorAtSpecificPoint(prev, oldLength);
  }
}

function placeCursorAtEnd(element) {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  element.focus();
}

function placeCursorAtSpecificPoint(element, position) {
  const range = document.createRange();
  const selection = window.getSelection();
  if (element.childNodes.length === 0) {
    element.appendChild(document.createTextNode(""));
  }
  const textNode = element.childNodes[0];
  const finalPosition = Math.min(position, textNode.length);
  range.setStart(textNode, finalPosition);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function navigateUp(event, block) {
  const selection = window.getSelection();
  if (selection.anchorOffset !== 0) return;
  const prev = block.previousElementSibling;
  if (prev) {
    event.preventDefault();
    placeCursorAtEnd(prev);
  }
}

function navigateDown(event, block) {
  const selection = window.getSelection();
  if (selection.anchorOffset !== block.textContent.length) return;
  const next = block.nextElementSibling;
  if (next) {
    event.preventDefault();
    next.focus();
  }
}
const seletor = document.getElementById("seletorTema");

// Função para aplicar o tema
const aplicarTema = (tema) => {
  document.body.setAttribute("data-theme", tema);
  localStorage.setItem("tema_escolhido", tema);
};

// Carrega o tema salvo ou usa o 'nord' como padrão
const temaSalvo = localStorage.getItem("tema_escolhido") || "nord";
aplicarTema(temaSalvo);
seletor.value = temaSalvo;

// Ouvinte de mudança
seletor.addEventListener("change", (e) => {
  aplicarTema(e.target.value);
});