import prisma from "./db";

export async function getTeachersByCourses(courses: string[]) {
    try {
        const teachers = await prisma.teacher.findMany({
            where: {
                course: {
                    hasSome: courses,
                },
            },
        });
        return teachers;
    } catch (error) {
        console.error("Error fetching teachers: ", error);
        throw new Error("Error fetching teachers.");
    }
}