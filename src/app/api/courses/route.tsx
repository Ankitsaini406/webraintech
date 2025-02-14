import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const courses = await prisma.course.findMany({});

        return NextResponse.json({ success: true, data: courses }, { status: 200 });
    } catch (error) {
        console.log(`Failed to fetch courses : `,  error);
        return NextResponse.json({ success: false, message: "Failed to fetch courses"}, { status: 500 });
    }
}