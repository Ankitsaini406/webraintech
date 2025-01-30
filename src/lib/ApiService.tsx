import prisma from "./db";

export async function getTeachersForStudent(studentId: string) {
    try {
        // Fetch student and their enrolled courses
        const student = await prisma.user.findUnique({
            where: {
                id: studentId,
                role: "STUDENT",
            },
            select: {
                course: true, // Fetch only the courses
            },
        });

        if (!student) {
            throw new Error("Student not found.");
        }

        // Find teachers who teach at least one of the student's courses
        const teachers = await prisma.user.findMany({
            where: {
                role: "TEACHER",
                course: {
                    hasSome: student.course, // Match teachers who teach any of the student's courses
                },
            },
        });

        return teachers;
    } catch (error) {
        console.error("Error fetching teachers: ", error);
        throw new Error("Error fetching teachers.");
    }
}
