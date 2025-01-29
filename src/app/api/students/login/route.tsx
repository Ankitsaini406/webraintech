import prisma from '@/lib/db';
import { createToken } from '@/utils/jwt';
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
        }

        const student = await prisma.student.findUnique({ where: { email } });
        if (!student) {
            return NextResponse.json({ message: 'Student not found' }, { status: 404 });
        }

        if (password !== student.password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        const token = createToken({ id: student.id, name: student.name, email: student.email, role: student.role, course: student.course });
        return NextResponse.json({ student, token });

    } catch (error) {
        console.error('Error in login API:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

