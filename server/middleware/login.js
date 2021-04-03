const jwt = require('jsonwebtoken');
const config = require('../help/config.json');

exports.obrigatorio = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, config.secret);
        req.usuario = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: "Falha na autenticação" });
    }
}

exports.opcional = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, config.secrect);
        req.usuario = decode;
        next();
    } catch (error) {
        next();
    }
}