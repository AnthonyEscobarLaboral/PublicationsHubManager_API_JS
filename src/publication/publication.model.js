import {Schema,model} from "mongoose";

const publicationSchema = Schema({
    title:{
        type:String,
        required: [true,"Publication title is required"],
        maxLength: [20, "Publication title cannot exceed 20 characters"]
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: [true, "Creator is required"],
        ref: "User"
    },
    category:{
        type: Schema.Types.ObjectId,
        required: [true, "Post Categorys is required"],
        ref: "Category"
    },
    content:{
        type: String,
        required: [true, "Content for the post is required"],
        maxLength: [100, "Publication content cannot exceed 100 characters"]
    },
    comments :[{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    status:{
        type: Boolean,
        default: true
    },
},
{
    versionKey: false,
    timestamps: true
})

publicationSchema.methods.toJSON = function(){
    const { _id, ...publication} = this.toObject()
    publication.pib = _id
    return publication
}

export default model("Publication", publicationSchema)