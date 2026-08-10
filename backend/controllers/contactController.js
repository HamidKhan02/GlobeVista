const Contact = require("../models/Contact");

// Save Contact Message

const createContact = async (req, res) => {

    try {

        const contact = await Contact.create(req.body);

        res.status(201).json({

            message: "Message Sent Successfully",

            contact

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createContact

};