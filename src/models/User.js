const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            ativo: DataTypes.BOOLEAN,
            perfil: DataTypes.STRING,
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            senha: DataTypes.STRING,
            senhaReseteToken: DataTypes.STRING,
            senhaReseteExpires: DataTypes.DATE,
        },{
            timestamps: false,
            sequelize
        })
    }

}

module.exports = User;