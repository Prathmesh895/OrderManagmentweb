import { ConnectDB } from '@/lib/conectdb';
import { NextResponse } from 'next/server';
import Orders from '@/models/orders';

export async function POST(req) {
    try {
        await ConnectDB(); // Connect to the database
        const { customer, ItemId, Items, status } = await req.json();
        // console.log('Received data:', { customer, ItemId, Items, status });

        // Transform Items array to match the schema
        const itemsArray = Items.map(item => ({
            itemId: item.id,
            quantity: item.quantity,
            name : item.name
        }));
 
        // Create a new order instance
        await Orders.create({
            Customer: customer,
            ItemId: ItemId,
            items: itemsArray, // Ensure this matches your schema
            status: status
        });
        const ordersData = await Orders.find({});
        return NextResponse.json({ message: "Item added successfully", ordersData }, { status: 201 });
    } catch (error) {
        console.error("Error while adding item:", error);
        return NextResponse.json({ message: "An error occurred while adding item." }, { status: 500 });
    }
}

// Get all order Details
export async function GET(){
    try {
       await ConnectDB();
       const ordersData = await Orders.find({});
       return NextResponse.json({ordersData},{status:200});
    } catch (error) {
        console.error("Error while fetching orderdata:", error);
        return NextResponse.json({ message: "An error occurred while fetching orderdata." }, { status: 500 });
        
    }
}

// Update order status 
export async function PATCH(req){
    try {
        await ConnectDB();
        const {_id,status} = await req.json();
        const UpdateOrder = await Orders.findByIdAndUpdate(_id,{ status }, { new: true });
        if (!UpdateOrder) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }
        return NextResponse.json({message:"Updated successfully",UpdateOrder},{status:201});
    } catch (error) {
        console.error("Error while Updating orderdata:", error);
        return NextResponse.json({ message: "An error occurred while Updating orderdata." }, { status: 500 });
    }
}
