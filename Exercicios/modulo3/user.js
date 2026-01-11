const usuario = {
    nome: "Ivo",
    email: "ivo@gmail.com",
    idade: 28
};

const blocos = [
    { tipo: "texto", conteudo: "Olá Mundo" }
];

function salvar() {
    // Salvando o array de blocos
    localStorage.setItem("blocos", JSON.stringify(blocos));
    
    // Opcional: Salvando o usuário também
    localStorage.setItem("usuario", JSON.stringify(usuario));
}
function carregar() {
    const dadosBaixados = localStorage.getItem("blocos");
    
    if (dadosBaixados) {
        const blocosConvertidos = JSON.parse(dadosBaixados);
        console.log(blocosConvertidos);
        return blocosConvertidos;
    } else {
        console.log("Nenhum dado encontrado.");
    }
}
