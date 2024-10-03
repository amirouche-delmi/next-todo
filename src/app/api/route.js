import connectToDatabase from "@/config/db";
import TodoModel from "@/models/TodoModel";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectToDatabase();

    try {
        const todos = await TodoModel.find(); // Récupérer tous les Todos
        return NextResponse.json(todos.reverse());
    } catch (error) {
        console.error('Error fetching todos:', error);
        return NextResponse.json({ msg: 'Failed to fetch todos' }, { status: 500 });
    }
}

export async function POST(request) {
    await connectToDatabase();

    try {
        const { title, description } = await request.json();
        
        // Vérifiez que les champs nécessaires sont fournis
        if (!title || !description) {
            return NextResponse.json({ msg: 'Title and description are required' }, { status: 400 });
        }

        const newTodo = await TodoModel.create({ title, description });
        return NextResponse.json({ msg: 'Todo Created', todo: newTodo }, { status: 201 });
    } catch (error) {
        console.error('Error creating todo:', error);
        return NextResponse.json({ msg: 'Failed to create todo' }, { status: 500 });
    }
}

export async function DELETE(request) {
    await connectToDatabase();

    const mongoId = request.nextUrl.searchParams.get('mongoId'); // Correction ici

    if (!mongoId) {
        return NextResponse.json({ msg: 'MongoId is required' }, { status: 400 });
    }

    try {
        const deletedTodo = await TodoModel.findByIdAndDelete(mongoId);

        if (!deletedTodo) {
            return NextResponse.json({ msg: 'Todo not found' }, { status: 404 });
        }

        return NextResponse.json({ msg: 'Todo Deleted' });
    } catch (error) {
        console.error('Error deleting todo:', error);
        return NextResponse.json({ msg: 'Failed to delete todo' }, { status: 500 });
    }
}
