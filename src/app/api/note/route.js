import { NextResponse } from 'next/server';

export async function GET() {
    // Fetch users from database or data source
    const users = [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Doe' }];
    return NextResponse.json(users);
}

export async function POST(request) {
    const body = await request.json();
    const newUser = { id: 3, name: body.name };
    return NextResponse.json(newUser, { status: 201 });
}
