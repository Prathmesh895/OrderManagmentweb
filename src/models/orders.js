// import mongoose from "mongoose";
// import { models } from "mongoose";

// const OrderShema = new mongoose.Schema({
//     ItemId: {
//         type: String,
//         required: [true, "Please provide a ItemId"], 
//     },
//     // CustomerId: {
//     //     type: Number,
//     //     required: [true, "Please provide a CustomerId"], 
//     // },
//     Customer: {
//         type: String,
//         required: [true, "Please provide a Customer"], 
//     },
//     items: [{
//         itemId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Item',
//             required: true,
//         },
//         quantity: {
//             type: Number,
//             required: true,
//         },
//     }],
//    status:{
//         type:String,
//         required:[true, "Please provide a status"]
//     },
    
// }
// ,
// { timestamps: true } 
// )

// const Orders = models.Orders || mongoose.model("Orders",OrderShema);

// export default Orders;


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    ItemId: {
        type: String,
        required: [true, "Please provide an ItemId"],
    },
    Customer: {
        type: String,
        required: [true, "Please provide a Customer"],
    },
    items: [{
        itemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item', // Ensure 'Item' matches your actual model name
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    status: {
        type: String,
        required: [true, "Please provide a status"]
    },
}, { timestamps: true });

const Orders = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default Orders;
