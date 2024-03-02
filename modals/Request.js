module.exports= (sequelize, DataTypes)=> {
    const Request= sequelize.define('request', {
        rqid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        uid: DataTypes.STRING,
        pid: DataTypes.STRING,
        status: DataTypes.STRING,
    });
    return Request;
}