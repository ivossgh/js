let funcionarios = [];

function adicionarFuncionario() {
    // Captura os elementos
    const inputNome = document.getElementById("inputNome");
    const inputEndereco = document.getElementById("inputEndereco");
    const inputTelefone = document.getElementById("inputTelefone");
    const mensagens = document.getElementById("mensagem");

    // Pega os valores
    const nome = inputNome.value.trim();
    const endereco = inputEndereco.value.trim();
    const telefone = inputTelefone.value.trim();

    // Validação simples: todos os campos são obrigatórios
    if (nome === "" || endereco === "" || telefone === "") {
        mensagens.textContent = "Por favor, preencha todos os campos!";
        mensagens.style.color = "#a34743";
        return; // Para a execução aqui
    }

    // Cria o objeto do funcionário
    const novoFuncionario = {
        nome: nome,
        endereco: endereco,
        telefone: telefone
    };

    // Adiciona ao array e limpa os campos
    funcionarios.push(novoFuncionario);
    limparCampos([inputNome, inputEndereco, inputTelefone]);
    
    mensagens.textContent = "Funcionário cadastrado!";
    mensagens.style.color = "green";

    renderizarTabela();
}

function renderizarTabela() {
    const corpoTabela = document.getElementById("corpoTabela");
    corpoTabela.innerHTML = ""; // Limpa a tabela antes de desenhar

    funcionarios.forEach(func => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${func.nome}</td>
            <td>${func.endereco}</td>
            <td>${func.telefone}</td>
        `;

        corpoTabela.appendChild(linha);
    });
}

function limparCampos(campos) {
    campos.forEach(campo => campo.value = "");
    campos[0].focus(); // Volta o cursor para o primeiro campo
}