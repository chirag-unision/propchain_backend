var express = require('express');
const { Web3 } = require('web3');
const Provider = require('@truffle/hdwallet-provider');

var app = express();
var port = process.env.PORT || 3100;

// DB Config
const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('./sequelize');

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

const db= {}; 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users= require('./modals/Users')(sequelize, DataTypes);
db.props= require('./modals/Props')(sequelize, DataTypes);

// Web3 Config
var SmartContractAddress = process.env.SMART_CONTRACT;
var SmartContractABI = [];
var address = process.env.ADDRESS ;
var privatekey = process.env.PRIVATE_KEY;
var rpcurl = process.env.RPC_URL;

var provider = new Provider(privatekey, rpcurl);
var web3 = new Web3(provider);
var myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress);

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('Hey there! This is ClubOnn backend.');
});

//Middleware
function middleDB(req, res, next) {
  req.db = db;
  next();
}

//Routers
const OwnerRoute= require('./routes/owner/')
const TenantRoute= require('./routes/tenant/')

// Apis
app.use('/api/owner/', middleDB, OwnerRoute);
app.use('/api/tenant/', middleDB, TenantRoute);

app.use((req, res) => {
    res.status(404).send('Not found!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
