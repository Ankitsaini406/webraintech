"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex h-screen items-center justify-center flex-col space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            <Skeleton className="w-48 h-6 rounded-md bg-gray-200" />
            <Skeleton className="w-32 h-4 rounded-md bg-gray-300" />
        </div>
    );
}
