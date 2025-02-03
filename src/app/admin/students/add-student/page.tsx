"use client";

import { ButtonBlack } from "@/utils/Buttons";
import { DateField, Input, MultipleSlection, Password, Section } from "@/utils/FormFields";
import { Student } from "@/utils/InitialState";
import { useState } from "react";

export default function AddStudent() {
    const [formData, setFormData] = useState<Student>({
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
        role: "STUDENT",
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Add Student</h2>

            {/* Personal Information */}
            <Section title="Personal Information">
                <Input title="Name" name="name" value={formData.name} onChange={handleChange} />
                <Input title="Email" name="email" value={formData.email} onChange={handleChange} />
                <Input title="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                <Input title="Alternative Number" name="alternativeNumber" value={formData.alternativeNumber} onChange={handleChange} />
                <DateField title="Birthday Date" value={formData.dob} onChange={handleDateChange} />
            </Section>

            {/* Parent Information */}
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
