import mongoose, { Schema } from "mongoose";
import { models } from "mongoose";

const ItemsShema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"], 
    },
    stock:{
        type:Number,
        required:[true, "Please provide a title"]
    },
    price:{
        type:Number,
        required:[true, "Please provide a title"]
    },
    
}
,
{ timestamps: true } 
)

const Items = models.Items || mongoose.model("Items",ItemsShema);

export default Items;