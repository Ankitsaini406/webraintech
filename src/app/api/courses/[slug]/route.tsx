import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// Next.js automatically passes `params` inside an object
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;

        const course = await prisma.course.findUnique({
            where: { slug },
            include: {
                teacher: true,
                enrollments: true,
                chapters: true,
            },
        });

        if (!course) {
            return NextResponse.json(
                { success: false, message: "Course not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: course }, { status: 200 });

    } catch (error) {
        console.error("❌ Error fetching course:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                { success: false, message: `Database Error: ${error.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
