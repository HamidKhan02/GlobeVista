const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },

    travelers: {
        type: Number,
        required: true
    },

    travelDate: {
        type: Date,
        required: true
    },

    message: {
        type: String
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Booking", bookingSchema);