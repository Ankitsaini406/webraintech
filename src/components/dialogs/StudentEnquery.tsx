"use client";

import { useState } from "react";
import { Input, TextArea } from "@/utils/FormFields";
import { ButtonLink, FormButton } from "@/utils/Buttons";
import { enqueryInitialState } from "@/utils/InitialState";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { createEnquery } from "@/actions/StudentEnquery";
import { toast } from "sonner";

function StudentEnquery() {
    const [formData, setFormData] = useState(enqueryInitialState);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.fatherName) newErrors.fatherName = "Father's Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone Number is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await createEnquery(new FormData(e.target as HTMLFormElement));
            setFormData(enqueryInitialState);
            toast.success("Enquery submitted successfully");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
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
                    <form onSubmit={handleSubmit}>
                        <Input
                            title="Name"
                            type="text"
                            value={formData.name}
                            name="name"
                            onChange={handleInputChange}
                            error={errors.name}
                        />
                        <Input
                            title="Father's Name"
                            type="text"
                            value={formData.fatherName}
                            name="fatherName"
                            onChange={handleInputChange}
                            error={errors.fatherName}
                        />
                        <Input
                            title="Email"
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={handleInputChange}
                            error={errors.email}
                        />
                        <Input
                            title="Phone Number"
                            type="phone"
                            value={formData.phoneNumber}
                            name="phoneNumber"
                            onChange={handleInputChange}
                            error={errors.phoneNumber}
                        />
                        <TextArea
                            title="Message"
                            value={formData.message}
                            name="message"
                            onChange={handleInputChange}
                        />
                        <FormButton
                            title={isLoading ? "Submitting..." : "Submit"}
                            disabled={isLoading}
                        />
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default StudentEnquery;
