import { getTeachersForStudent } from "@/lib/ApiService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { studentId } = await req.json();

        if (!studentId) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const teachers = await getTeachersForStudent(studentId);
        return NextResponse.json(teachers);
    } catch (error) {
        console.error("Error in API route: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}