const jwt = require('jsonwebtoken');

module.exports = (request, response, next ) =>{
    const authHeader = request.headers.authorization;

    if(!authHeader){
        return response.status(401).json({error : "Usuário não logado."});
    }
    
    const parts = authHeader.split(' ');
    
    if(!parts.length === 2){
        return response.status(401).json({error:" error: 'Token Error'"});
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)){
        return response.status(401).json({error:" error: 'Token com formato invalido'"});
    }
    
    jwt.verify(token, process.env.SECRET, (err, decoded) =>{
        if(err){
            return response.status(401).json({error:" error: 'Token invalido'"});
        }
        request.userId = decoded.id;
        return next();
    });
}