module.exports= (sequelize, DataTypes)=> {
    const Props= sequelize.define('props', {
        pid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        uid: DataTypes.STRING,
        title: DataTypes.STRING,
        address: DataTypes.STRING,
        description: DataTypes.STRING,
        highlights: DataTypes.STRING,
        no_of_person: DataTypes.INTEGER,
        locality: DataTypes.STRING,
        price: DataTypes.STRING,
        status: DataTypes.STRING
    });
    return Props;
}