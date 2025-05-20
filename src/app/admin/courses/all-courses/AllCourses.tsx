"use client";

import React, { useEffect, useState, useMemo } from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import { formatterPrice, truncateText } from "@/utils/Utils";
import { Course } from "@/types/types";
import { toast } from "sonner";
import { deleteCourse, publishCourse } from "@/actions/Courses";

export default function AllCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    console.log(`This is course : `, courses);

    // Fetch course data from API
    useEffect(() => {
        const fetchCourses = async () => {
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

        fetchCourses();
    }, []);

    // Memoize the data for performance
    const persons = useMemo(() => courses, [courses]);

    const columns: ColumnDef<Course>[] = [
        {
            accessorKey: "title",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Title <ArrowUpDown />
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
            header: () => <div>Intro</div>,
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
            header: () => <div>Teacher</div>,
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
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Price <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => {
                const price = formatterPrice(row.getValue("price")) as string;
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="font-medium">₹{formatterPrice(row.getValue("price"))}</div>
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
            header: () => <div>Discount</div>,
            cell: ({ row }) => {
                const discount = row.getValue("discount") as string;
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="font-medium">{row.getValue("discount")}%</div>
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
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
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
                                        window.location.reload();
                                    } else {
                                        toast.error('Failed to update status: ' + res.error);
                                    }
                                }}
                            >
                                {course.isPublish ? 'Unpublish News' : 'Publish News'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={async () => {

                                    const res = await deleteCourse({
                                        slug: course.slug,
                                        Delete: !course.isDelete,
                                    });

                                    if (res.success) {
                                        toast.success(
                                            course.isDelete
                                                ? 'Restore successfully. Refreshing...'
                                                : 'Delete successfully. Refreshing...'
                                        );
                                        window.location.reload();
                                    } else {
                                        toast.error('Failed to update status: ' + res.error);
                                    }
                                }}
                            >
                                {course.isDelete ? 'Restore News' : 'Delete News'}
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: persons,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full px-8">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter Title..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {loading ? (
                <div className="text-center py-4">Loading courses...</div>
            ) : (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No Course found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
