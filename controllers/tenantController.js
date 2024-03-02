const rand= () => { 
    var minm = 1000000; 
    var maxm = 9999999; 
    var n= Math.floor(Math 
    .random() * (maxm - minm + 1)) + minm; 
  
    return n;
  } 
  
exports.getprops = async (req, res) => {
    const { query } = req.body;
    const contract = req.contract;
    const metaAddress = req.address;    
    const db = req.db;
    const props = db.props;

    try {
        // Create a new property with provided details
        const property = await props.findAll({ where: { address: query } });

        res.status(201).json({ message: 'Property added successfully!', property });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

exports.getpropinfo = async (req, res) => {
    const { pid } = req.body;
    const contract = req.contract;
    const metaAddress = req.address;    
    const db = req.db;
    const props = db.props;

    try {
        // Create a new property with provided details
        const property = await props.findAll({ where: { pid: pid } });

        res.status(201).json({ message: 'Property added successfully!', property });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

exports.sendrequest = async (req, res) => {
    const { uid, pid } = req.body;
    const contract = req.contract;
    const metaAddress = req.address;    
    const db = req.db;
    const request = db.request;
    const rqid= rand();

    try {
        const reqq = await request.create({ rqid: rqid, uid: uid, pid: pid });

        res.status(201).json({ message: 'Property added successfully!', reqq });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}