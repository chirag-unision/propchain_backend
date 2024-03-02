var express = require('express');
const { Web3 } = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const cors = require('cors');
const multer  =  require('multer')
const upload = multer()


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
db.request= require('./modals/Request')(sequelize, DataTypes);

// Web3 Config
var SmartContractAddress = '0x9D51AE1E6Ecd8a47a3298a76bDB67bc3357b68C2';
var SmartContractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "timestamp",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "rateby",
				"type": "uint256"
			}
		],
		"name": "addOwnerRatings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "timestamp",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "rateby",
				"type": "uint256"
			}
		],
		"name": "addTenantRatings",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "pid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mcn",
				"type": "uint256"
			}
		],
		"name": "createProp",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "uid",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "aadhar",
				"type": "string"
			}
		],
		"name": "createUser",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "print",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
];
var address = "0x4CBF339033CC620dcE00b710f4b84C3cB81140D3";
var privatekey = "37d68faa0f7a9bbb6224ed405928957ab59cd3d71731c7cd3d73f42f3dc17d4f";
var rpcurl = "https://sepolia.infura.io/v3/368f203ed2084c338052b50c07f87d26";

var provider = new Provider(privatekey, rpcurl);
var web3 = new Web3(provider);
var myContract = new web3.eth.Contract(SmartContractABI, SmartContractAddress);

app.use(express.json());
app.use(cors());
app.use(express.static('public'));
// app.use(upload.array())

app.get('/', (req, res)=>{
    console.log(req.body);
    res.send('Hey there! This is ClubOnn backend.');
});
// app.post('/', (req, res)=>{
//     console.log(req.files)
//     console.log(req.body);
//     res.send(req.body.property_name);
// });

// Handle POST request to /upload endpoint
app.post('/', upload.any(), (req, res) => {
    console.log(req.body); // Output formData
    res.send('Received FormData successfully');
});

//Middleware
function middleDB(req, res, next) {
  req.db = db;
  req.contract= myContract;
  req.address= address;
  next();
}

//Routers
const OwnerRoute= require('./routes/owner')
const TenantRoute= require('./routes/tenant')
const UserRoute= require('./routes/user')

// Apis
app.use('/api/owner/', middleDB, OwnerRoute);
app.use('/api/tenant/', middleDB, TenantRoute);
app.use('/api/user/', middleDB, UserRoute);

app.use((req, res) => {
    res.status(404).send('Not found!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
