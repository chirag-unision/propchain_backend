
const rand= () => { 
    var minm = 1000000; 
    var maxm = 9999999; 
    var n= Math.floor(Math 
    .random() * (maxm - minm + 1)) + minm; 
  
    return n;
} 

exports.addprops = async (req, res) => {
    const { uid, title, address, locality, description, highlights, price, people, property_id } = req.body;
    console.log(req.files);
    const contract = req.contract;
    const metaAddress = req.address;    
    const db = req.db;
    const props = db.props;
    const pid= rand();

    try {
        // Create a new property with provided details
        const property = await props.create({
            pid: pid,
            uid: uid,
            title: title,
            address: address,
            locality: locality,
            description: description,
            highlights: highlights,
            no_of_person: people,
            price: price,
            status: 'not on lease'
        });
        var data = await contract.methods.createProp(pid, property_id).send({ from: metaAddress });
        res.status(201).json({ message: 'Property added successfully!', property });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

exports.getprops = async (req, res) => {
    const { uid } = req.body;
    const db = req.db;
    const props = db.props;

    try {
        // Fetch currently not leased properties for the given user
        const Properties = await props.findAll({
            where: {
                uid: uid,
            },
        });

        res.status(200).json({
            Properties
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

exports.handleReq = async (req, res) => {
    const { rqid, status } = req.body;
    const db = req.db;
    const request = db.request;
    try {
        // Find user by uid and update status
        const [updatedRowsCount] = await request.update({status: status} , { where: { rqid: rqid, status: 'pending'} });

        if (updatedRowsCount > 0) {
            res.status(200).json({ message: 'Value updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getrequests = async (req, res) => {
    const { uid } = req.body;
    const contract = req.contract;
    const metaAddress = req.address;    
    const db = req.db;
    const request = db.request;

    try {
        const requests = await request.findAll({
            where: {
                uid: uid,
            },
        });

        res.status(201).json({ message: 'Property added successfully!', requests });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

exports.dealmaker = async (req, res) => {
    const { rqid, status } = req.body;
    const db = req.db;
    const request = db.request;
    try {
        // Find user by uid and update status
        const [updatedRowsCount] = await request.update({status: status} , { where: { rqid: rqid, status: 'pending'} });

        if (updatedRowsCount > 0) {
            res.status(200).json({ message: 'Value updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
