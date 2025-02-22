import {Schema,model} from "mongoose";

const commentSchema = Schema({
    opinion:{
        type:String,
        required: [true,"the opions comment is needed for your account"]
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: [true, "Creator is required"],
        ref: "User"
    },
    status:{
        type: Boolean,
        default: true
    },
},
{
    versionKey: false,
    timestamps: true
})

commentSchema.methods.toJSON = function(){
    const {_id, ...comment} = this.toObject()
    comment.cmid = _id
    return comment
}

export default model("Comment", commentSchema)