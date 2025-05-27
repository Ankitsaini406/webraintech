import { addCourse } from "@/actions/AddData";
import CourseForm from "../CourseForm";

export default function Page() {
    const handleAdd = async (formData: FormData) => {
        return await addCourse(formData);
    };

    return (
        <div className="container p-4">
            <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
            <CourseForm onSubmit={handleAdd} />
        </div>
    );
}