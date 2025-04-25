import { getCourse } from "@/actions/GetCourse";
import CoursePage from "./Course";

interface Props {
    params: { slug: string };
}

export default async function Page({ params }: Props) {
    const course = await getCourse(params.slug);

    return <CoursePage course={course} />;
}
