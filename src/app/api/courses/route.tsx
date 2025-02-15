import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const courses = await prisma.course.findMany({});
        
        if (!courses || courses.length === 0) {
            throw new Error("No courses found in the database.");
        }

        return NextResponse.json({ success: true, data: courses }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            console.error("❌ Failed to fetch courses:", error.message);
        } else {
            console.error("❌ Failed to fetch courses:", error);
        }

        return NextResponse.json(
            { success: false, message: "Failed to fetch courses", error: (error as Error).message },
            { status: 500 }
        );
    }
}
