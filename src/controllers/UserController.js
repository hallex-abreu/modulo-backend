const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

require('dotenv/config');

module.exports = {
    async login(request, response){
        const { email, senha } = request.body;

        const user = await User.findOne({ where: {
            email
        }});

        if(!user)
            return response.json({ error : "Não foi encontrado nenhum usuário com esse email"});
        if(user.ativo == false)
            return response.json({ error : "Necessário confirmar email para poder fazer login"});  

        if(!await bcrypt.compare(senha, user.senha))
            return response.json({ error : "Senha inválida, tente novamente."});
          
        const token = jwt.sign({ id : user.id}, process.env.SECRET, {
            expiresIn: 86400,
        }); //Token não expira

        user.senha = undefined;
        return response.json({ user, token });

    },
    async forgot_password(request, response){
        const { email } = request.body;

        try{
            const user = await User.findOne({where: {email}});

            if(user){
                const token = crypto.randomBytes(20).toString('hex');

                const now = new Date();
                now.setHours(now.getHours() + 1); //Adiciona uma hora a mais em now

                await User.update({
                    senhaReseteToken : token,
                    senhaReseteExpires : now
                },{where:{ id: user.id}});

                try{
                    mailer.sendMail({
                        to:email,
                        from : 'hallex@uhull.net',
                        template:'auth/forgot_password',
                        context : { token, email },   
                    });
                    return response.json({success : "Enviado com sucesso! Verifique sua caixa de email."});
                }
                catch(err){
                    console.log(err);   
                    return response.json({error : "Não foi possível enviar a recuperação de senha no email."});
                }                
            }
            return response.json({error : "Usuário não encontrado"});
        }
        catch(err){
            console.log(err);
            return response.json({error : "Erro ao tentar recuperar senha, Tente novamente."});
        }
    },

    async reset_password(request, response){
        const {email, token, senha } = request.body;
        const user = await User.findOne({where: {email}});
        const now = new Date();
        
        if(user){
            if(token !== user.senhaReseteToken){
                return response.json({error : "Erro token invalido."});
            }
            else if(now > user.senhaReseteExpires){
                return response.json({error : "Erro expirado, tente novamente."});
            }
            else{
                const pass = bcrypt.hashSync(senha, 10);
                await User.update({
                    senha: pass
                },{where:{ id: user.id}});
                return response.json({succes : "Senha alterada com sucesso."});
            }
        }
        return response.json({error : "Usuário não encontrado"});
    },

    async confirmar_user(request, response){
        const { id } = request.params;

        const user = await User.findOne({where: {id}});
        if(user){
            if(user.ativo == true)
                return response.json({success: 'Usuário já foi confirmado!'})
            await User.update({
                ativo: true
            },{where:{ id }})
            return response.json({success: 'Usuário confirmado com sucesso!'})
        }
        else{
            return response.json({error: 'Usuário não encontrado, favor faça novamente o seu cadastro!'})
        }
    },

    async index(request, response){
        const user = await User.findAll();
        return response.json(user);    
    },
    async show(request, response){
        const {id} = request.params;
        const user = await User.findByPk(id);
        return response.json(user);    
    },
    async store(request, response){
       const { nome, email, telefone, senha, perfil } = request.body;
       const pass = bcrypt.hashSync(senha, 10)
        
       const userSearch = await User.findOne({where: {email}});

       if(userSearch)
            return response.json({ error : "Já existe um usuário cadastrado com este email"});
       
       const user = await User.create({
            perfil,
            nome,
            email,   
            telefone,
            senha: pass,
        });

        const token = jwt.sign({ id : user.id}, process.env.SECRET, {
            expiresIn: 86400,
        }); //Token não expira
        const userId = user.id;
        //Envio de email para confirmar se é um usuário valido
        mailer.sendMail({
            to:email,
            from : 'contato@appjangadeiro.com.br',
            template:'auth/validar_cadastro',
            context : { nome, userId },   
        });
        //Envio de email para confirmar se é um usuário valido
        user.senha = undefined;
        return response.json({ user, token});
    },
    async update(request, response){
        const { nome, telefone, senha, perfil} = request.body;
        const { id }= request.params;

        const user = await User.findOne({where: {id}});
       
        if(user){
            if(senha){
                if(await bcrypt.compare(senha, user.senha))
                return response.json({ error : "Senha precisa ser diferente."});
                var pass = bcrypt.hashSync(senha, 10);
            }
            else{
                var pass = user.senha;
            }

            try{
                await User.update({
                    perfil,
                    nome,
                    telefone,
                    senha: pass
                }, {where: { id }})
                return response.json({success: 'Alterado com sucesso.'});
            }
            catch(e){
                    console.log(e);
                    return response.json({error: 'Não foi possível alterar o usuário'});
            }
        }
        return response.json({error: 'usuário não encontrado'});
    },
    async delete(request, response){
        const { id } = request.params;

        const user = await User.findOne({where: {id}});

        if(user){
            await User.destroy({where: {id}});
            return response.json({success: 'Deletado com sucesso.'});
        }

        return response.json({error: 'usuário não encontrado'});
    }

}