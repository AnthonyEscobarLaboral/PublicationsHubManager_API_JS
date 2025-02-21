import {Schema,model} from "mongoose";

const userSchema = Schema({
    completeName:{
        type:String,
        required: [true,"complete name is needed for your account"],
        maxLength: [60, "Name cannot exceed 60 characters"]
    },
    email:{
        type: String,
        required: [true, "An email is required for your account"],
        unique: true
    },
    username:{
        type: String,
        required: [true, "An username is required for your account"],
        unique:true
    },
    password:{
        type: String,
        required: [true, "A password is required for your account"]
    },
    type:{
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    publication: [{
        type: Schema.Types.ObjectId,
        ref: 'publication'
    }],
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
},
{
    versionKey: false,
    timestamps: true
})

userSchema.methods.toJSON = function(){
    const {password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)