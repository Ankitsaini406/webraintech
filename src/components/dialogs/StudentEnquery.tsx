"use client";

import { useState } from "react";
import { Input, TextArea } from "@/utils/FormFields";
import { ButtonLink, FormButton } from "@/utils/Buttons";
import { enqueryInitialState } from "@/utils/InitialState";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { createEnquery } from "@/actions/StudentEnquery";

function StudentEnquery() {
    const [formData, setFormData] = useState(enqueryInitialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <Dialog>
            {/* Dialog Trigger */}
            <DialogTrigger asChild>
                <ButtonLink title="Enquery" className="text-red-500" />
            </DialogTrigger>

            {/* Dialog Content */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enquery Form</DialogTitle>
                    <DialogDescription>
                        Please fill out the form to enquery for courses.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <form action={createEnquery}>
                        <Input
                            title="Name"
                            type="text"
                            value={formData.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                        <Input
                            title="Father's Name"
                            type="text"
                            value={formData.fatherName}
                            name="fatherName"
                            onChange={handleInputChange}
                        />
                        <Input
                            title="Email"
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={handleInputChange}
                        />
                        <Input
                            title="Phone Number"
                            type="phone"
                            value={formData.phoneNumber}
                            name="phoneNumber"
                            onChange={handleInputChange}
                        />
                        <TextArea
                            title="Message"
                            value={formData.message}
                            name="message"
                            onChange={handleInputChange}
                        />
                        <FormButton title={"Submit"} disabled={false} />
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default StudentEnquery;
