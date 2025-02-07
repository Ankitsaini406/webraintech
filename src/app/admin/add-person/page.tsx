"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ButtonBlack } from "@/utils/Buttons";
import { DateField, Input, MultipleSlection, Password, Section, TextArea } from "@/utils/FormFields";
import { AddPersons } from "@/utils/InitialState";
import { useState } from "react";

enum Role {
    STUDENT = 'STUDENT',
    TEACHER = 'TEACHER',
}

export default function AddPerson() {
    const [formData, setFormData] = useState<AddPersons>({
        name: "",
        email: "",
        fatherName: "",
        motherName: "",
        phoneNumber: "",
        alternativeNumber: "",
        aadhaarNumber: "",
        course: [],
        address: "",
        dob: new Date(),
        password: "",
        confirmPassword: "",
        role: Role.STUDENT,
        details: "",
        brief: "",
        facebook: "",
        instagram: "",
        linkdin: "",
        youtube: "",
        x: "",
        updateAt: new Date(),
        createdAt: new Date(),
    });

    const courseOptions = [
        "Web Development",
        "Data Science",
        "Graphic Design",
        "Digital Marketing",
        "Cyber Security",
        "AI & Machine Learning",
        "Business Analytics",
    ];

    // Handle Input Change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle Date Change
    const handleDateChange = (date: Date) => {
        if (date) {
            setFormData((prev) => ({ ...prev, dob: date }));
        }
    };

    // Handle Course Selection
    const handleCourseChange = (selectedCourse: string) => {
        if (selectedCourse && !formData.course.includes(selectedCourse)) {
            setFormData((prev) => ({
                ...prev,
                course: [...prev.course, selectedCourse],
            }));
        }
    };

    // Remove Selected Course
    const removeCourse = (courseToRemove: string) => {
        setFormData((prev) => ({
            ...prev,
            course: prev.course.filter((course) => course !== courseToRemove),
        }));
    };

    return (
        <form className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Add Person</h2>

            {/* Role Selection */}
            <Section title="Select Role">
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="TEACHER">Teacher</SelectItem>
                    </SelectContent>
                </Select>
            </Section>

            {/* Personal Information */}
            <Section title="Personal Information">
                <Input title="Name" name="name" value={formData.name} onChange={handleChange} />
                <Input title="Email" name="email" value={formData.email} onChange={handleChange} />
                <Input title="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                <Input title="Alternative Number" name="alternativeNumber" value={formData.alternativeNumber} onChange={handleChange} />
                <DateField title="Birthday Date" value={formData.dob} onChange={handleDateChange} />
            </Section>

            {/* Parent Information (only for students) */}
                <Section title="Parent Information">
                    <Input title="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                    <Input title="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} />
                </Section>

            {/* Course Selection */}
            <Section title="Course Selection">
                <MultipleSlection label="Courses" options={courseOptions} selectedOptions={formData.course} onSelect={handleCourseChange} onRemove={removeCourse} />
            </Section>

            {/* Identification */}
            <Section title="Identification">
                <Input title="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} />
                <Input title="Address" name="address" value={formData.address} onChange={handleChange} />
            </Section>

            {/* Teacher-Specific Fields (Only shown if role is TEACHER) */}
            {formData.role === Role.TEACHER && (
                <Section title="Teacher Information">
                    <TextArea title="Details" name="details" value={formData.details} onChange={handleChange} />
                    <TextArea title="Brief" name="brief" value={formData.brief} onChange={handleChange} />
                    <Input title="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
                    <Input title="Instagram" name="instagram" value={formData.instagram} onChange={handleChange} />
                    <Input title="LinkedIn" name="linkdin" value={formData.linkdin} onChange={handleChange} />
                    <Input title="YouTube" name="youtube" value={formData.youtube} onChange={handleChange} />
                    <Input title="X (Twitter)" name="x" value={formData.x} onChange={handleChange} />
                </Section>
            )}

            {/* Password Section */}
            <Section title="Account Security">
                <Password title="Password" name="password" value={formData.password} onChange={handleChange} />
                <Password title="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            </Section>

            {/* Submit Button */}
            <div className="mt-6">
                <ButtonBlack title="Submit" />
            </div>
        </form>
    );
}