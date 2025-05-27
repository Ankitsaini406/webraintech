import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const courses = await prisma.course.findMany({
            include: {
                teacher: true,
                chapters: true,
                faqs: true,
            }
        });
        
        const normalizedCourses = courses.map(course => ({
            ...course,
            teacher: course.teacher || [],
        }));

        return NextResponse.json({ success: true, data: normalizedCourses }, { status: 200 });

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
