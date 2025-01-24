import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";

interface ThankYouDialogProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
    gifUrl?: string; // URL of the GIF to be passed as a prop
}

function ThankYouDialog({ open, onClose, title, description, gifUrl }: ThankYouDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="sm:text-center relative">
                    {gifUrl && (
                        <div className="absolute w-[400px] h-[300px] sm:w-[500px] sm:h-[300px] bottom-10 left-0">
                            <Image src={gifUrl} alt="Thank You Animation" className="w-full max-w-[300px] mx-auto" fill />
                        </div>
                    )}
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    {/* {gifUrl && (
                        <div className="absolute w-[400px] h-[300px] sm:w-[500px] sm:h-[300px] top-10 left-0">
                            <Image src={gifUrl} alt="Thank You Animation" className="w-full max-w-[300px] mx-auto" fill />
                        </div>
                    )} */}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default ThankYouDialog;
