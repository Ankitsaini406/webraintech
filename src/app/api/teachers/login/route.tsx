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

        const teacher = await prisma.teacher.findUnique({ where: { email } });
        if (!teacher) {
            return NextResponse.json({ message: 'Teacher not found' }, { status: 404 });
        }

        if (password !== teacher.password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        const token = createToken({ id: teacher.id, name: teacher.name, email: teacher.email, role: teacher.role });
        return NextResponse.json({ teacher, token });

    } catch (error) {
        console.error('Error in login API:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

