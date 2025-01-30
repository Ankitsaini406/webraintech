import { Skeleton } from "@/components/ui/skeleton";
import { fetchTeachersByCourses } from "@/store/actions/FindTeacherByCourseAction";
import { AppDispatch, RootState } from "@/store/store";
import { Teachers } from "@/utils/InitialState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TeachersSection({ studentId }: { studentId: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const { teachers, status, error } = useSelector((state: RootState) => state.findTeacherByCourse);

    useEffect(() => {
        if (studentId) {
            dispatch(fetchTeachersByCourses(studentId));
        }
    }, [studentId, dispatch]);

    return (
        <div className="flex flex-col gap-8">
            {status === "loading" && (
                <>
                    <div className="w-full shadow-md p-4 flex flex-col md:flex-row gap-4 border items-center">
                        <Skeleton className="w-[150px] h-[150px] rounded-full shrink-0"></Skeleton>
                        <div className="flex flex-col w-full">
                            <Skeleton className="w-[200px] h-[20px]"></Skeleton>
                            <Skeleton className="text-lg mt-4 mb-2 min-w-[250px] w-[300px] h-[30px]"></Skeleton>
                            <Skeleton className="min-w-[250px] w-full h-[70px]"></Skeleton>
                        </div>
                    </div>

                    <div className="w-full shadow-md p-4 flex flex-col md:flex-row gap-4 border items-center">
                        <Skeleton className="w-[150px] h-[150px] rounded-full shrink-0"></Skeleton>
                        <div className="flex flex-col w-full">
                            <Skeleton className="w-[200px] h-[20px]"></Skeleton>
                            <Skeleton className="text-lg mt-4 mb-2 min-w-[250px] w-[300px] h-[30px]"></Skeleton>
                            <Skeleton className="min-w-[250px] w-full h-[70px]"></Skeleton>
                        </div>
                    </div>

                    <div className="w-full shadow-md p-4 flex flex-col md:flex-row gap-4 border items-center">
                        <Skeleton className="w-[150px] h-[150px] rounded-full shrink-0"></Skeleton>
                        <div className="flex flex-col w-full">
                            <Skeleton className="w-[200px] h-[20px]"></Skeleton>
                            <Skeleton className="text-lg mt-4 mb-2 min-w-[250px] w-[300px] h-[30px]"></Skeleton>
                            <Skeleton className="min-w-[250px] w-full h-[70px]"></Skeleton>
                        </div>
                    </div>
                </>
            )}
            {status === "failed" && <p className="text-red-500">Error: {error}</p>}
            {status === "succeeded" && (
                teachers.map((teacher: Teachers) => {
                    return (
                        <div key={teacher.id} className="w-full shadow-md p-4 flex flex-col md:flex-row gap-4 border items-center">
                            <div className="bg-gradient-to-b from-transparent to-black-opacity-30 w-[150px] h-[150px] rounded-full shrink-0">
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">{teacher.course}</p>
                                <h1 className="text-lg mt-4"><span className="font-bold">{teacher.name}</span></h1>
                                <p className="">{teacher.brief}</p>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    );
}