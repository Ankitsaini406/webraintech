import { useState, useEffect } from "react";
import axios from "axios";

interface Course {
    title: string;
    image: string;
    intro: string;
    slug: string;
}

const useCourses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get("/api/courses");
                setCourses(data.data);
            } catch (err) {
                setError("Failed to fetch courses");
                console.error("Error fetching courses:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return { courses, loading, error };
};

export default useCourses;
