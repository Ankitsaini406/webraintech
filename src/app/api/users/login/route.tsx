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

        // Find user by email (applies to both students & teachers)
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Check password (In production, use bcrypt for hashing)
        if (password !== user.password) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
        }

        // Generate JWT token with role-based access
        const token = createToken({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            course: user.course,
        });

        return NextResponse.json({ user, token });

    } catch (error) {
        console.error('Error in login API:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
