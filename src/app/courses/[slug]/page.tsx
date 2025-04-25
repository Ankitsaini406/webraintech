import { getCourse } from "@/actions/GetCourse";
import CoursePage from "./Course";

interface PageProps {
    params: { slug: string };
}

export default async function Page({ params }: PageProps) {
    const course = await getCourse(params.slug);
    return <CoursePage course={course} />;
}
