module.exports= (sequelize, DataTypes)=> {
    const Users= sequelize.define('users', {
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: DataTypes.STRING,
        mobile: DataTypes.BIGINT,
        name: DataTypes.STRING,
        password: DataTypes.STRING
    });
    return Users;
}