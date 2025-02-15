import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = await params;
        const course = await prisma.course.findUnique({
            where: { slug },
            include: {
                teacher: true,
                enrollments: true,
                chapters: true,
            },
        });

        if (!course) {
            return NextResponse.json({ success: false, message: "Course not found"}, { status: 404 });
        }

        return NextResponse.json({ success: true, data: course }, { status: 200 });
    } catch (error) {
        console.log(`Failed to fetch course : `,  error);
        return NextResponse.json({ success: false, message: "Failed to fetch course"}, { status: 500 });
    }
}