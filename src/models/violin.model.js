const mongoose = require('mongoose');
const violinSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true//valida que el nombre de la guitarra pasa a la db. Es decir , es obligatorio
        },
        price: {
            type: Number,
            required: true
        }
    }, 

    { 
        timestamps: true
    }//propiedad de mongoose que agrega la fecha de creacion y actualizacion
);

const Violin = mongoose.model('Violin', violinSchema);
module.exports = Violin;