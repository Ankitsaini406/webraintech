"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxhook";
import { fetchContactUs, markContactAsRead } from "@/store/actions/ContactUsAction";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ContactUs {
    id: number;
    name: string;
    email: string;
    message: string;
    phoneNumber: string;
    read: boolean;
}

export default function ContactUsPage() {
    const dispatch = useAppDispatch();
    const { contactUs, loading, error } = useAppSelector(
        (state) => state.contactus
    );

    const handleRefresh = () => {
        dispatch(fetchContactUs());
    }

    const handleMarkAsRead = (id: number) => {
        dispatch(markContactAsRead(id));
    };

    useEffect(() => {
        dispatch(fetchContactUs());
    }, [dispatch]);

    const columns: ColumnDef<ContactUs>[] = [
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
            accessorKey: "message",
            header: "Message",
            cell: ({ row }) => row.getValue("message") || "N/A",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const contact = row.original;

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
                                onClick={() => navigator.clipboard.writeText(String(contact.id))}
                            >
                                Copy Contact ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {contact.read ? (
                                <DropdownMenuItem>Read</DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={() => handleMarkAsRead(contact.id)}>
                                    Mark as Read
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <DataTable
            data={contactUs}
            columns={columns}
            loading={loading}
            error={error}
            onRefresh={handleRefresh}
            searchKey="name"
        />
    );
}