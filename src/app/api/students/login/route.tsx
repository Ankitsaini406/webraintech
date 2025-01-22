import prisma from '@/lib/db';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    const { email, password } = await req.json();

    // Fetch student from database
    const student = await prisma.student.findUnique({ where: {email}});
    if (!student) {
        return NextResponse.json({ message: 'Student not found' }, { status: 404 });
    }

    // Hash the provided password with the stored salt
    // const passwordHash = hashPassword(password, student.password);

    // Compare the hashed password with the stored hash
    if (password !== student.password) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    return NextResponse.json({ student, token: 'some_jwt_token' });
}
