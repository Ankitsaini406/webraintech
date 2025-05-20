export const dynamic = "force-dynamic";

import { getCourse } from "@/actions/Courses";
import CoursePage from "./Course";

export default async function Page({ params, }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const course = await getCourse(slug);
    return <CoursePage course={course} />;
}
