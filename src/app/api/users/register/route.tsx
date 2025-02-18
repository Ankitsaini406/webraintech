import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password, phoneNumber, fatherName, motherName, alternativeNumber, address, dob, aadhaarNumber, role } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({message: "All field are required"}, {status: 400});
        }

        const existingUser = await prisma.user.findUnique({ where: {email}});
        if (existingUser) {
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
                phoneNumber,
                fatherName,
                motherName,
                alternativeNumber,
                address,
                dob,
                aadhaarNumber,
                role,
            }
        });

        const { ...userWithoutPassword } = newUser;

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Registration failed" }, { status: 500 });
    }
}