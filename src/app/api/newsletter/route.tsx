import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    try {
        const { email } = await req.json();

        // Check if the subscriber exists
        const existingSubscriber = await prisma.newsLetter.findFirst({
            where: { email },
        });

        // Update the updatedAt field if subscriber exists
        if (existingSubscriber) {
            const updateSubscriber = await prisma.newsLetter.update({
                where: { email },
                data: { 
                    updatedAt: new Date(), 
                    subscribed: true,
                },
            });
            return NextResponse.json(updateSubscriber);
        }

        // Add a new subscriber if they don't exist
        const newSubscriber = await prisma.newsLetter.create({
            data: { email, subscribed: true },
        });
        return NextResponse.json(newSubscriber);

    } catch (error) {
        return NextResponse.json({ message: `Failed to update subscriber ${error}` }, { status: 500 });
    }
}