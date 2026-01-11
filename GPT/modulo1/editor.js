// Vamos atras do elemento com ID no nosso documento html
let titulo = document.getElementById("Titulo");
// AO armazenar ele em titulo podemos trata-lo, nesse caso alteramos ele
titulo.textContent = "Nova aula";
// Pasamos a cor para ele
titulo.style.color = "red";

// Mesma coisa que acima
let btn = document.getElementById("btn");
// Usamos agora eventos para tratar meu elemnto. aqui o addEventListener "escuta" um evento
// Nesse caso o click, depois fazemos uma funcao que diz o que acontece apos clicar
btn.addEventListener("click", function(){
    alert("Voce clicou");
});