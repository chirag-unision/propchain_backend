module.exports= (sequelize, DataTypes)=> {
    const Categories= sequelize.define('categories', {
        catid: DataTypes.STRING,
        catname: DataTypes.STRING
    });
    return Categories;
}