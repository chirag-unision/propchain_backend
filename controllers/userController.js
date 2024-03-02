
const rand= () => { 
  var minm = 1000000; 
  var maxm = 9999999; 
  var n= Math.floor(Math 
  .random() * (maxm - minm + 1)) + minm; 

  return n;
} 

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const db= req.db;
    const users= db.users;

    try {
        // Find user with provided email and password
        const user = await users.findOne({ where: { email: email, password: password } });

        if (user) {
            res.status(200).json({ message: 'Login successful!', user });
        } else {
            res.status(401).json({ message: 'Invalid email or password.' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.signup= async (req, res) => {
    const { email, password, mobile, name, aadhar } = req.body;
    const contract= req.contract;
    const address= req.address;
    const db= req.db;
    const users= db.users;
    const uid= rand();

    try {
      // Create a new user with provided email and password
      const user = await users.create({ uid: uid, email: email, password: password, name: name, mobile: mobile });

      var data = await contract.methods.createUser(uid, aadhar).send({ from: address });

      res.status(201).json({ message: 'Signup successful!', user });
    } catch (error) {
      // Handle Sequelize unique constraint violation error
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ message: 'Email is already registered.', uid: uid });
      } else {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
}
