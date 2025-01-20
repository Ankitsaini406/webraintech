"use client";

import { useState } from "react";
import { Input, TextArea } from "@/utils/FormFields";
import { ButtonLink, FormButton } from "@/utils/Buttons";
import { enqueryInitialState } from "@/utils/InitialState";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

function StudentEnquery() {
    const [formData, setFormData] = useState(enqueryInitialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Reset any previous error messages
        setFieldErrors({}); // Reset field errors

        // Validate form data
        const errors: { [key: string]: string } = {};
        if (!formData.name) errors.name = "Name is required.";
        if (!formData.fatherName) errors.fatherName = "Father's Name is required.";
        if (!formData.email) errors.email = "Email is required.";
        if (!formData.phoneNumber) errors.phoneNumber = "Phone number is required.";

        // If there are errors, stop submission and show errors
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setLoading(false); // Stop loading
            return;
        }

        // Simulate form submission (replace with actual API call)
        try {
            // Simulate a delay
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Form submitted", formData);
            setLoading(false); // Stop loading after the submission
            // Optionally, reset the form if needed
            setFormData(enqueryInitialState);
        } catch (error) {
            setError("There was an error submitting the form.");
            console.error(error);
            setLoading(false); // Stop loading even if there's an error
        }
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
                            error={fieldErrors.name}
                        />
                        <Input
                            title="Father's Name"
                            type="text"
                            value={formData.fatherName}
                            name="fatherName"
                            onChange={handleInputChange}
                            error={fieldErrors.fatherName}
                        />
                        <Input
                            title="Email"
                            type="email"
                            value={formData.email}
                            name="email"
                            onChange={handleInputChange}
                            error={fieldErrors.email}
                        />
                        <Input
                            title="Phone Number"
                            type="phone"
                            value={formData.phoneNumber}
                            name="phoneNumber"
                            onChange={handleInputChange}
                            error={fieldErrors.phoneNumber}
                        />
                        <TextArea
                            title="Message"
                            value={formData.message}
                            name="message"
                            onChange={handleInputChange}
                            error={fieldErrors.message}
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <FormButton title={loading ? "Submitting..." : "Submit"} disabled={loading} />
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default StudentEnquery;
