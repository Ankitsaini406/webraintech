import prisma from '@/lib/db';
import { createToken } from '@/utils/jwt';
import { setCookie } from 'cookies-next';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ message: 'Missing email or password' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        if (password !== user.password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        const token = createToken({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            course: user.course,
        });

        setCookie("authToken", token, { maxAge: 60 * 60 * 24 * 7 });
        return NextResponse.json({ user, token });

    } catch (error) {
        console.error('Error in login API:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
