import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users, { status: 200});

    } catch (error) {
        console.error("Error in API route: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}