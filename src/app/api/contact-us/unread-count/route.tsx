import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const count = await prisma.contactUs.count({
            where: { read: false },
        });
        return NextResponse.json({ count }, { status: 200 });
    } catch (error) {
        console.error("Error fetching unread count:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
