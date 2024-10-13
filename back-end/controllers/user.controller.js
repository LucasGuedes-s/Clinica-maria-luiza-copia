const usuario = require('../services/user.service')

async function LoginUsuario(req, res, next){
    try {
        const login = await usuario.LoginUser(req.body.usuario);
        res.setHeader('Authorization', `Bearer ${login.token}`);
        res.status(200).json({ 
            usuario: {
                nome: login.dados_usuario.nome,
                email: login.dados_usuario.email,
                permissao: login.dados_usuario.permissao,
                foto: login.dados_usuario.foto,
                telefone: login.dados_usuario.telefone
            }
        });
        res.end()
    } catch (err) {
        console.error(`Erro no login do usuário.`, err.message);
        err.statusCode = 401;
        next(err);
    }
}
async function updateSenha(req, res, next){
    try {
        const nova_senha = await usuario.updateSenha(req.body)
        res.status(200).json({nova_senha});
        next()
    } catch (err) {
        console.log(err)
        console.error(`Erro ao atualizar a nova senha`);
    }
}

module.exports = {LoginUsuario, updateSenha};