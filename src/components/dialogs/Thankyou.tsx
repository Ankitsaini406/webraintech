import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ThankYouDialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

function ThankYouDialog({ open, onClose, title, description }: ThankYouDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="sm:text-center">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ThankYouDialog;