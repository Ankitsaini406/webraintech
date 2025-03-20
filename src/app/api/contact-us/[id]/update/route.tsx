import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    const { params } = context; 

    if (!params?.id) {
        return new NextResponse(JSON.stringify({ error: "Missing ID parameter" }), { status: 400 });
    }

    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID format" }), { status: 400 });
    }

    try {
        const updatedContact = await prisma.contactUs.update({
            where: { id },
            data: { read: true },
        });

        return new NextResponse(
            JSON.stringify({ message: "Marked as read successfully", data: updatedContact }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating contact:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to mark as read", details: error instanceof Error ? error.message : error }),
            { status: 500 }
        );
    }
}
