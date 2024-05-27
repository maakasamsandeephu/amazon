const mongoose = require('mongoose');
const { productSchema } = require('./product');

const userSchema = mongoose.Schema({
    name :{
        require: true,
        type: String,
        trim: true
    },
    email:{
        require:true,
        type: String,
        trim: true,
        validate:{
            validator : (value)=>{
                const re = /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u
                return value.match(re);
            },
            message:'Invalid email address'
        }
    },

    password:{
        require:true,
        type:String,
        // validate:{
        //     validator:(value)=>{
        //         const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
        //         return value.match(re);

        //     },
        //     message:'please Choose strong password'
        // }
    },

    address:{
        type:String,
        default:''
    },

    type:{
        type:String,
        default:'user'
    },

    //cart will be in future
    cart :[ {
        
        product: productSchema,
        quantity: {
            type: Number,
            required: true,
        }

    }],

});

const User = mongoose.model("User",userSchema);
module.exports = User;