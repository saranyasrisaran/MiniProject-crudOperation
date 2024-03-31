const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ClubSchema = new Schema(
    {
        Name : {
            type: String,
            requried: true
        },
        Age : {
            type: String,
            requried: true
        },
        Location : {
            type: String,
            requried: true
        }


    }
);

module.exports = mongoose.model('crud_demo',ClubSchema);
