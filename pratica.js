// 1. DECLARAÇÃO DO ESTADO GLOBAL (Faltava no seu código)
let editorState = [];

// Seleciona os elementos do editor e do menu de comandos
const editor = document.getElementById('editor');
const commandMenu = document.getElementById('command-menu');

// Armazena meu bloco ativo 
let activeBlockForMenu = null;

// Função para inserir uma quebra de linha no cursor
function insertlineBreakAtCursor(block){
    const selecao = window.getSelection();
    if(selecao.rangeCount > 0){
        const range = selecao.getRangeAt(0);
        const br = document.createElement("br");
        range.insertNode(br);
        range.setStartAfter(br);
        range.setEndAfter(br);
        selecao.removeAllRanges();
        selecao.addRange(range);
    }
}

// FUNÇÕES DE GERENCIAMENTO DE ESTADO (IDs e Objetos)
function addBlock(type = "paragraph", content = "") {
  const block = {
    id: crypto.randomUUID(),
    type,
    content
  };
  editorState.push(block);
  return block;
}

function renderBlock(blockData) {
  const el = document.createElement("div");
  el.className = "block";
  el.dataset.id = blockData.id;
  el.dataset.type = blockData.type;
  el.contentEditable = "true"; // Correção: string "true"
  el.innerHTML = blockData.content; // Usamos innerHTML para suportar <br> e estilos
  return el;
}

// Função para criar bloco após o atual (Corrigida para usar o Estado)
function createBlockAfter(block) {
  const blockData = addBlock(); // Cria no array editorState
  const newBlock = renderBlock(blockData); // Gera o HTML
  
  editor.insertBefore(newBlock, block.nextSibling);
  newBlock.focus();
}

function handleBackspace(event, block){
    const selection = window.getSelection();
    const isAtStart = selection.anchorOffset === 0;

    if(block.textContent ==="" && editor.children.length > 1){
        event.preventDefault();
        const prev = block.previousElementSibling;
        
        // Remove do estado
        editorState = editorState.filter(b => b.id !== block.dataset.id);
        block.remove();
        
        if (prev) placeCursorAtEnd(prev);
        return; 
    }

    if(isAtStart){
        const prev = block.previousElementSibling;
        if(!prev || prev.tagName ==="HR") return;
        
        event.preventDefault();

        const oldLength = prev.textContent.length;
        const currentContent = block.innerHTML;

        // Remove do estado
        editorState = editorState.filter(b => b.id !== block.dataset.id);
        block.remove();

        // Funde os conteúdos
        prev.innerHTML += currentContent;
        
        // Atualiza o conteúdo do bloco anterior no estado
        const stateBlock = editorState.find(b => b.id === prev.dataset.id);
        if (stateBlock) stateBlock.content = prev.innerHTML;

        placeCursorAtSpecificPoint(prev, oldLength);
    }
}

function placeCursorAtEnd(element){
    const range = document.createRange();
    const selecao = getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selecao.removeAllRanges();
    selecao.addRange(range);
    element.focus();
}

// EVENTOS DE TECLADO
editor.addEventListener("keydown", (event) =>{
    const currentBlock = document.activeElement;
    if (!currentBlock || !currentBlock.classList.contains("block")) return;

    if (event.key ==="Enter" && event.shiftKey){
        const selecao= getSelection();
        const anchorNode = selecao.anchorNode;
        if(anchorNode && (anchorNode.parentElement.tagName ==="LI" || anchorNode.tagName ==="LI")){
            return;
        }
        event.preventDefault();
        insertlineBreakAtCursor();
        commandMenu.hidden = true;
        return;
    }

    if(event.key ==="Enter"){
        event.preventDefault();
        createBlockAfter(currentBlock);
        commandMenu.hidden = true;
    }

    if(event.key ==="Tab"){
        event.preventDefault();
        const selecao = getSelection();
        const range = selecao.getRangeAt(0);
        const tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
        range.insertNode(tabNode);
        range.setStartAfter(tabNode);
        range.setEndAfter(tabNode);
        selecao.removeAllRanges();
        selecao.addRange(range);
    }

    if (event.key ==="Backspace"){
        handleBackspace(event, currentBlock)
    }

    if(event.key ==="ArrowUp"){
        navigateUp(event, currentBlock)
    }

    if(event.key ==="ArrowDown"){
        navigateDown(event, currentBlock)
    }
});

// MONITORAMENTO DE INPUT
editor.addEventListener("input", (event) =>{
    const block = document.activeElement;
    if(!block || !block.classList.contains("block")) return;

    // Sincroniza o conteúdo com o editorState
    const id = block.dataset.id;
    const stateBlock = editorState.find(b => b.id === id);
    if (stateBlock) {
        stateBlock.content = block.innerHTML;
    }

    // Se o conteúdo do bloco for apenas um ponto ".", mostramos o menu
    if(block.textContent === "."){
        activeBlockForMenu = block;
        showCommandMenu(block);
    } else {
        commandMenu.hidden = true;
    }
});

function showCommandMenu(block){
    const rect = block.getBoundingClientRect();
    commandMenu.style.top = `${rect.bottom + window.scrollY}px`;
    commandMenu.style.left = `${rect.left}px`;
    commandMenu.hidden = false;
}

// Delegação de clique no menu de comandos (Movido para fora para evitar múltiplos eventos)
commandMenu.addEventListener("click", (event) =>{
    const item = event.target.closest("[data-command]");
    if(!item || !activeBlockForMenu) return;

    const command = item.dataset.command;
    activeBlockForMenu.textContent = ""; 
    setBlockType(activeBlockForMenu, command);
    commandMenu.hidden = true;
});

// funcao que define o tipo de bloco
function setBlockType(block, type){
    let newElement;
    switch(type){
        case "heading-1": newElement = document.createElement("h1"); break;
        case "heading-2": newElement = document.createElement("h2"); break;
        case "list":
            newElement = document.createElement("ul");
            const li = document.createElement("li");
            li.textContent = '';
            newElement.appendChild(li);
            break;
        case "quote": newElement = document.createElement("blockquote"); break;
        case "code":
            newElement = document.createElement("pre");
            newElement.style.background = "#7e7a7a";
            newElement.style.padding = "10px";
            newElement.style.borderRadius = "5px";
            break;
        case "divider":
            newElement = document.createElement("hr");
            newElement.contentEditable = "false";
            break;
        default:
            newElement = document.createElement("div");
    }

    // Atualiza o tipo no estado
    const stateBlock = editorState.find(b => b.id === block.dataset.id);
    if (stateBlock) {
        stateBlock.type = type;
    }

    newElement.className = "block";
    newElement.dataset.id = block.dataset.id; // Mantém o ID original
    newElement.dataset.type = type;
    
    if(type !== "divider") newElement.contentEditable = "true";

    // Substitui o bloco antigo pelo novo
    block.replaceWith(newElement);
    
    if(type !=="divider") {
        newElement.focus();
    } else {
        createBlockAfter(newElement);
    }
}

// Fecha o menu de comandos se o usuário clicar fora dele
document.addEventListener("mousedown", (event) =>{
    if (!commandMenu.contains(event.target)){
        commandMenu.hidden = true;
    }
});

function placeCursorAtSpecificPoint(element, position){
    const range = document.createRange();
    const selecao = document.getSelection();
    
    // Garante que exista um nó de texto
    if(element.childNodes.length === 0){
        element.appendChild(document.createTextNode(""));
    }

    const textNode = element.childNodes[0];
    const finalPosition = Math.min(position, textNode.length || 0);
    
    try {
        range.setStart(textNode, finalPosition);
        range.setEnd(textNode, finalPosition);
        selecao.removeAllRanges();
        selecao.addRange(range);
    } catch (e) {
        console.warn("Erro ao posicionar cursor:", e);
    }
    element.focus();
}

function navigateUp(event, block){
    const selecao = window.getSelection();
    if(selecao.anchorOffset !== 0) return;
    const prev = block.previousElementSibling;
    if(prev && prev.classList.contains("block")){
        event.preventDefault();
        placeCursorAtEnd(prev);
    }
}

function navigateDown(event, block){
    const selecao = window.getSelection();
    if(selecao.anchorOffset !== block.textContent.length) return;
    const next = block.nextElementSibling;
    if(next && next.classList.contains("block")){
        event.preventDefault();
        next.focus();
    }
}

// CONTROLE DE TEMAS
const themeToggle = document.getElementById("theme-toggle");
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

// MODO FOCO
const focusToggle = document.getElementById("focus-toggle");
if(localStorage.getItem("focus") === "on"){
    document.body.classList.add("focus-mode");
}

focusToggle.addEventListener("click", ()=>{
    document.body.classList.toggle("focus-mode");
    localStorage.setItem("focus", document.body.classList.contains("focus-mode") ? "on" : "off");
});

// INICIALIZAÇÃO: Criar o primeiro bloco se o editor estiver vazio
if(editor.children.length === 0) {
    const initialData = addBlock();
    editor.appendChild(renderBlock(initialData));
}