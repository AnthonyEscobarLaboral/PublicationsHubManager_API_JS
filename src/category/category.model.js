import {Schema,model} from "mongoose";

const categorySchema = Schema({
    categoryName:{
        type:String,
        required: [true,"A category name is needed"],
        maxLength: [50, "The category name cannot exceed 50 characters"],
        unique: true,
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timestamps: true
});

categorySchema.methods.toJSON = function(){
    const {_id, ...category} = this.toObject()
    category.cid = _id
    return category
}

export default model("Category", categorySchema)