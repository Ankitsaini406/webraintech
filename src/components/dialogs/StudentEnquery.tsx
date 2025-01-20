"use client";

import { useState } from "react";
import { ButtonLink } from "@/utils/Buttons";
import { enqueryInitialState } from "@/utils/InitialState";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/utils/FormFields";

function StudentEnquery() {
    const [formData, setFormData] = useState(enqueryInitialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <Dialog>
            {/* Dialog Trigger */}
            <DialogTrigger asChild>
                <ButtonLink title="Register" className="text-red-500" />
            </DialogTrigger>

            {/* Dialog Content */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enquery Form</DialogTitle>
                    <DialogDescription>
                        Please fill out the form to enquery as a student.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <form >
                        <Input title="Name" type="text" value={formData.name} name="name" onChange={handleInputChange}/>
                        <Input title="Email" type="email" value={formData.email} name="email" onChange={handleInputChange}/>
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default StudentEnquery;
