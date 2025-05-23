"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import axios from "axios";
import { formatterPrice, truncateText } from "@/utils/Utils";
import { Course } from "@/types/types";
import { toast } from "sonner";
import { deleteCourse, publishCourse } from "@/actions/Courses";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useReduxhook";
import { DataTable } from "@/components/DataTable";

export default function AllCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const { user } = useAppSelector((state) => state.user);
    const router = useRouter();

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/courses");
            setCourses(response.data.data);
        } catch (err) {
            setError("Failed to fetch courses");
            console.error("❌ Error fetching courses:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    const data = useMemo(() => courses, [courses]);

    const columns: ColumnDef<Course>[] = [
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const title = row.getValue("title") as string;
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="font-medium max-w-80">{truncateText(title)}</div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-80">
                                <p>{title}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            },
        },
        {
            accessorKey: "intro",
            header: "Intro",
            cell: ({ row }) => {
                const intro = row.getValue("intro") as string;
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="font-medium max-w-80">{truncateText(intro)}</div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-80">
                                <p>{intro}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            },
        },
        {
            id: "teacher",
            header: "Teacher",
            cell: ({ row }) => {
                const teacher = row.original.teacher;
                const teacherName = teacher && teacher.name && teacher.name !== ''
                    ? teacher.name
                    : "No teacher assigned";
                return (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="font-medium">{teacherName}</div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-80">
                            <p>{teacherName}</p>
                        </TooltipContent>
                    </Tooltip>
                );
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const price = formatterPrice(row.getValue("price")) as string;
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="font-medium">₹{price}</div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-80">
                                <p>{price}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            },
        },
        {
            accessorKey: "discount",
            header: "Discount",
            cell: ({ row }) => {
                const discount = row.getValue("discount") as string;
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="font-medium">{discount}%</div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-80">
                                <p>{discount}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const course = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => router.push(`/courses/${course.slug}`)}>
                                View Course
                            </DropdownMenuItem>
                            {user?.role === 'ADMIN' && (
                                <>
                                    <DropdownMenuItem
                                        onClick={async () => {
                                            const res = await publishCourse({
                                                slug: course.slug,
                                                publish: !course.isPublish,
                                            });

                                            if (res.success) {
                                                toast.success(
                                                    course.isPublish
                                                        ? 'Unpublished successfully. Refreshing...'
                                                        : 'Published successfully. Refreshing...'
                                                );
                                                handleRefresh();
                                            } else {
                                                toast.error('Failed to update status: ' + res.error);
                                            }
                                        }}
                                    >
                                        {course.isPublish ? 'Unpublish Course' : 'Publish Course'}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={async () => {
                                            const res = await deleteCourse({
                                                slug: course.slug,
                                                Delete: !course.isDelete,
                                            });
                                            if (res.success) {
                                                toast.success(
                                                    course.isDelete
                                                        ? 'Restored successfully. Refreshing...'
                                                        : 'Deleted successfully. Refreshing...'
                                                );
                                                handleRefresh();
                                            } else {
                                                toast.error('Failed to delete course: ' + res.error);
                                            }
                                        }}
                                    >
                                        {course.isDelete ? 'Restore Course' : 'Delete Course'}
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <DataTable
            data={data}
            columns={columns}
            loading={loading}
            error={error}
            onRefresh={handleRefresh}
            searchKey="title"
        />
    );
}
