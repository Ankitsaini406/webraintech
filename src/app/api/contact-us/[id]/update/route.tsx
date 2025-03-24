import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const url = new URL(req.nextUrl);
    const id = url.pathname.split("/").at(-2);

    if (!id || isNaN(Number(id))) {
        return new NextResponse(JSON.stringify({ error: "Invalid ID parameter" }), { status: 400 });
    }

    try {
        const updatedContact = await prisma.contactUs.update({
            where: { id: Number(id) },
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
