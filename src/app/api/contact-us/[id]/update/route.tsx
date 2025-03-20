import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    const { params } = context;
    const id = parseInt(params.id, 10); 

    if (isNaN(id)) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID format" }), { status: 400 });
    }

    try {
        await prisma.contactUs.update({
            where: { id },
            data: { read: true },
        });

        return new NextResponse(JSON.stringify({ message: "Marked as read successfully" }), {
            status: 200,
        });
    } catch (error) {
        console.error("Error updating contact:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to mark as read", details: error }),
            { status: 500 }
        );
    }
}
