import { ConnectDB } from '@/lib/conectdb'
import Items from '@/models/items';
import { NextResponse } from 'next/server';

// add new Item to database 
export async function POST(req) {
    try {
        await ConnectDB(); // Connect to the database
        const { title, stock, price } = await req.json();
        await Items.create({ title, stock, price });
        return NextResponse.json({ message: " item Added Successfull" }, { status: 201 })
    } catch (error) {
        console.error("Error while Adding  item :", error);
        return NextResponse.json({ message: "An error occurred while adding item." }, { status: 500 });
    }
}

// get all item detials from data base 

export async function GET() {
    try {
        await ConnectDB();
        const Item = await Items.find({});
        return NextResponse.json({ Item }, { status: 201 })
    } catch (error) {
        console.error("Error while fetching  item :", error);
        return NextResponse.json({ message: "An error occurred while fetching item." }, { status: 500 });
    }
}

// delete item from data base 
export async function DELETE(req) {
    try {
        await ConnectDB();
        const {_id} = await req.json();
        const deletedItem = await Items.deleteOne({ _id:_id}); // Delete item by ID
        if (deletedItem.deletedCount === 0) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Item deleted successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'An error occurred while deleting item.' }, { status: 500 });
    }
}

// upadate data stock & Price  

export async function PATCH(req){
    try {
        await ConnectDB();
        const { _id, stock, price } = await req.json();
        const updatedData = {};
        if (stock !== undefined) updatedData.stock = stock;
        if (price !== undefined) updatedData.price = price;

        const updatedItem = await Items.findByIdAndUpdate(_id, updatedData, { new: true })
        
        if (!updatedItem) {
            return NextResponse.json({ message: 'Item not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Item updated successfully', updatedItem }, { status: 200 });
    } catch (error) {
        console.error("Error while updating item:", error);
        return NextResponse.json({ message: 'An error occurred while updating item.' }, { status: 500 });
    }
}