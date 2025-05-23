"use client";

import React, { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import axios from "axios";
import { truncateText } from "@/utils/Utils";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/DataTable";

interface Placement {
    id: string;
    companyName: string;
    position: string;
    location: string;
    experience: string;
    salary: string;
    skills: string;
    description: string;
    requirements: string;
    applicationDeadline: Date;
    createdAt: Date;
    updatedAt: Date;
}

export default function PlacementPage() {
    const [placements, setPlacements] = useState<Placement[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/placement");
            setPlacements(response.data.data);
        } catch (err) {
            setError("Failed to fetch placement opportunities");
            console.error("❌ Error fetching placements:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleRefresh();
    }, []);

    const columns: ColumnDef<Placement>[] = [
        {
            accessorKey: "companyName",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Company
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const companyName = row.getValue("companyName") as string;
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="font-medium max-w-[200px]">{truncateText(companyName)}</div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{companyName}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const name = row.getValue("name") as string;
                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="font-medium max-w-[200px]">{truncateText(name)}</div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{name}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "phoneNumber",
            header: "Phone Number",
        },
        {
            accessorKey: "website",
            header: "Website",
        },
        {
            accessorKey: "linkedin",
            header: "Linkedin",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const placement = row.original;
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
                                onClick={() => {
                                    // View placement details
                                    router.push(`/admin/placement/${placement.id}`);
                                }}
                            >
                                View Details
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold">Placement Opportunities</h1>
            <DataTable
                data={placements}
                columns={columns}
                loading={loading}
                error={error}
                onRefresh={handleRefresh}
                searchKey="companyName"
            />
        </div>
    );
} 