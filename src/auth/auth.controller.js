const authService = require("./auth.service");

async function login(req, res) {
    try {
        // TODO: Extrair username e password do corpo da requisição
        const { username, password } = req.body; // se o body for vazio, recebe {}
        const loginUser = username; // se o username for vazio, recebe o email
        const loginPass = password; // se a senha for vazia, recebe a senha

        // TODO: Chamar o serviço de autenticação
        const resultado = await authService.autenticarUsuario(loginUser, loginPass);

        // TODO: Verificar se a autenticação falhou
        if (!resultado.sucesso) {
            return res.status(401).json({ erro: resultado.mensagem });
        }

        // TODO: Gerar token JWT se autenticação foi bem-sucedida
        const token = authService.gerarToken(loginUser);

        // TODO: Retornar resposta com token
        return res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (erro) {
        console.log("Erro ao fazer login:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function logout(req, res) {
    try {
        req.logout(function (err) {
            if (err) {
                console.log("Erro ao fazer logout:", err);
                return res.status(500).json({ erro: err.message });
            }
            return res.status(200).json({ message: "Logout successful" });
        });
    } catch (erro) {
        console.log("Erro ao fazer logout:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

async function criarUsuario(req, res) {
    try {
        // TODO: Chamar serviço para criar novo usuário
        // Passar req.body com os dados (username, passwd, nome)
        const novoUsuario = await authService.criarNovoUsuario(req.body); 

        console.log("Usuário inserido");
        
        // TODO: Retornar resposta com status 201 (created) e dados do usuário
        return res.status(201).json(novoUsuario);

    } catch (erro) {
        console.log("Erro ao criar usuário:", erro);
        return res.status(500).json({ erro: erro.message });
    }
}

module.exports = {
    login,
    logout,
    criarUsuario,
};
