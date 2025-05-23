import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        
        const contactUs = await prisma.placement.findMany();

        return NextResponse.json({ success: true, data: contactUs }, { status: 200 });
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