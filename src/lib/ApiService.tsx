import prisma from "./db";

export async function getTeachersForStudent(studentId: string) {
    try {
        // Fetch student's enrolled courses
        const enrollments = await prisma.enrollment.findMany({
            where: { studentId },
            select: { courseId: true },
        });

        if (!enrollments.length) {
            throw new Error("Student is not enrolled in any courses.");
        }

        // Extract course IDs
        const courseIds = enrollments.map((enrollment) => enrollment.courseId);

        // Find teachers who are assigned to these courses
        const teachers = await prisma.user.findMany({
            where: {
                role: "TEACHER",
                coursesAsign: {
                    some: {
                        id: { in: courseIds }, // Match courses assigned to the teacher
                    },
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
                phoneNumber: true,
            },
        });

        return teachers;
    } catch (error) {
        console.error("Error fetching teachers: ", error);
        throw new Error("Error fetching teachers.");
    }
}
