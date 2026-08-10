const Booking = require("../models/Booking");

// Create Booking

const createBooking = async (req, res) => {

    try {

        const booking = await Booking.create(req.body);

        res.status(201).json({

            message: "Booking Successful",

            booking

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createBooking

};