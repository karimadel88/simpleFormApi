const { Model, DataTypes } = require('sequelize');

const sequelize = require("./../config/db");


class User extends Model{}

User.init({
  name:{
    type:DataTypes.STRING,
  },
  password:{
    type:DataTypes.STRING,
  },
  email:{
    type:DataTypes.STRING,
  } 
},
{
  sequelize,modelName:"User" 
})

module.exports = User