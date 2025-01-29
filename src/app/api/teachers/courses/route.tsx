import { getTeachersByCourses } from "@/lib/ApiService";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { courses } = await req.json();

        if (!courses || !Array.isArray(courses)) {
            return NextResponse.json({ error: "Invalid request array" }, { status: 400 });
        }

        const teachers = await getTeachersByCourses(courses);
        return NextResponse.json(teachers);
    } catch (error) {
        console.error("Error in API route: ", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}