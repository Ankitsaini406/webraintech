"use client";

import { Users } from "@/utils/InitialState";
import { Button } from "@/components/ui/button";
import { fetchAllUsers } from "@/store/actions/UserActions";
import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxhook";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";

const AllPersons = () => {
    const dispatch = useAppDispatch();
    const { user, loading, error } = useAppSelector(
        (state) => state.user
    );

    const [roleFilter, setRoleFilter] = useState("STUDENT");

    const handleRefresh = () => {
        dispatch(fetchAllUsers());
    };

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const persons = useMemo(() =>
        Array.isArray(user)
            ? user.filter((user: Users) => user.role === roleFilter)
            : [],
        [user, roleFilter]
    );

    const columns: ColumnDef<Users>[] = [
        {
            accessorKey: "name",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phoneNumber",
            header: "Phone Number",
            cell: ({ row }) => row.getValue("phoneNumber") || "N/A",
        },
        {
            accessorKey: "fatherName",
            header: "Father Name",
            cell: ({ row }) => row.getValue("fatherName") || "N/A",
        },
        {
            accessorKey: "motherName",
            header: "Mother Name",
            cell: ({ row }) => row.getValue("motherName") || "N/A",
        },
        {
            accessorKey: "address",
            header: "Address",
            cell: ({ row }) => row.getValue("address") || "N/A",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const student = row.original;

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
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(student.id)}
                            >
                                Copy student ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View student</DropdownMenuItem>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <div>
            <div className="mb-4 px-8">
                <Select
                    onValueChange={(value) => setRoleFilter(value)}
                    value={roleFilter}
                >
                    <SelectTrigger className="!w-[200px] dark:bg-gray-700 dark:text-white">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="TEACHER">Teacher</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DataTable
                data={persons}
                columns={columns}
                loading={loading}
                error={error}
                onRefresh={handleRefresh}
                searchKey="name"
            />
        </div>
    );
};

export default AllPersons;