import { Skeleton } from "@/components/ui/skeleton";
import { fetchTeachersByCourses } from "@/store/actions/FindTeacherByCourseAction";
import { AppDispatch, RootState } from "@/store/store";
import { Teachers } from "@/utils/InitialState";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TeachersSection({ userCourses }: { userCourses: string[] }) {
    const dispatch = useDispatch<AppDispatch>();
    const { teachers, status, error } = useSelector((state: RootState) => state.findTeacherByCourse);

    useEffect(() => {
        if (userCourses?.length > 0) {
            dispatch(fetchTeachersByCourses(userCourses));
        }
    }, [userCourses, dispatch]);

    return (
        <div className="flex flex-col gap-8">
            {status === "loading" && (
                <div className="w-full shadow-md p-4 flex gap-4 border">
                    <Skeleton className="w-48 h-48 rounded-full"></Skeleton>
                    <div>
                        <div className="flex flex-col">
                            <Skeleton className="w-[200px] h-[20px]"></Skeleton>
                            <Skeleton className="text-lg my-4 w-[300px] h-[30px]"></Skeleton>
                            <Skeleton className=" w-[600px] h-[70px]"></Skeleton>
                        </div>
                    </div>
                </div>
            )}
            {status === "failed" && <p className="text-red-500">Error: {error}</p>}
            {status === "succeeded" && (
                //     <div className="w-full shadow-md p-4 flex gap-4 border">
                //         <Skeleton className="w-48 h-48 rounded-full"></Skeleton>
                //         <div>
                //             <div className="flex flex-col">
                //                 <Skeleton className="w-[200px] h-[20px]"></Skeleton>
                //                 <Skeleton className="text-lg my-4 w-[300px] h-[30px]"></Skeleton>
                //                 <Skeleton className=" w-[600px] h-[70px]"></Skeleton>
                //             </div>
                //         </div>
                //     </div>
                // )}
                teachers.map((teacher: Teachers) => {
                    return (
                        <div key={teacher.id} className="w-full shadow-md p-4 flex gap-4 border">
                            <div className="bg-gradient-to-b from-transparent to-black-opacity-30 w-[200px] h-[200px] rounded-full shrink-0">
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold">{teacher.course}</p>
                                <h1 className="text-lg my-4">Teacher Name : <span className="font-bold">{teacher.name}</span></h1>
                                <p className="">{teacher.brief}</p>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
    );
}