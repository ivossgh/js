const titulo = document.querySelector("#titulo")
const botao = document.querySelector("#btn")
const campo = document.querySelector("#campo")
const preview = document.querySelector("#preview")
const btn = document.querySelector("#toggle");
const status = document.querySelector("#status");
const lista = document.querySelector("#lista");
const btns = document.querySelector("#add");
    
botao.addEventListener("click", ()=>{
    titulo.textContent = "Texto alterado com JS"
});

campo.addEventListener("input", () =>{
    console.log("Digitando")
})

campo.addEventListener("input", () =>{
    const texto = campo.value;
    console.log(texto)
})

campo.addEventListener("input", () =>{
    preview.textContent = (campo.value)
})

btn.addEventListener("click", () =>{
    status.classList.toggle("ativo");

    if(status.classList.contains("ativo")){
        status.textContent = "Ativo"
    }else{
        status.textContent = "Inativo"
    }
})
btns.addEventListener("click", () =>{
    const li = document.createElement("li");
    li.textContent = "Nova nota";
    lista.appendChild(li);
})

