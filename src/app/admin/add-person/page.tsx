"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ButtonBlack } from "@/utils/Buttons";
import { DateField, Input, MultipleSlection, Password, Section, TextArea } from "@/utils/FormFields";
import { useAddPersonForm } from "@/hooks/useAddPersonhook";
import { Role } from "@prisma/client";

export default function AddPerson() {

    const { formData, errors, isLoading, courseOptions, handleChange, handleDateChange, handleCourseChange, removeCourse, handleSubmit, dispatch } = useAddPersonForm();

    return (
        <form className="p-4" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Add Person</h2>

            {/* Role Selection */}
            <Section title="Select Role">
                <Select
                    value={formData.role}
                    onValueChange={(value) =>
                        dispatch({ type: "SET_FIELD", field: "role", value: value as Role })
                    }
                >
                    <SelectTrigger className="w-[200px] dark:bg-gray-700 dark:text-white">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={Role.STUDENT}>Student</SelectItem>
                        <SelectItem value={Role.TEACHER}>Teacher</SelectItem>
                    </SelectContent>
                </Select>
            </Section>

            {/* Personal Information */}
            <Section title="Personal Information">
                <Input title="Name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                <Input title="Email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                <Input title="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
                <Input title="Alternative Number" name="alternativeNumber" value={formData.alternativeNumber} onChange={handleChange} />
                <DateField title="Birthday Date" value={formData.dob} onChange={handleDateChange} />
            </Section>

            {/* Parent Information */}
            {formData.role === Role.STUDENT && (
                <Section title="Parent Information">
                    <Input title="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} error={errors.fatherName} />
                    <Input title="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} error={errors.motherName} />
                </Section>
            )}

            {/* Course Selection */}
            <Section title="Course Selection">
                <MultipleSlection label="Courses" options={courseOptions} selectedOptions={formData.course} onSelect={handleCourseChange} onRemove={removeCourse} error={errors.course} />
            </Section>

            {/* Identification */}
            <Section title="Identification">
                <Input title="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} error={errors.aadhaarNumber} />
                <Input title="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
            </Section>

            {/* Teacher-Specific Fields */}
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
                <Password title="Password" name="password" value={formData.password} onChange={handleChange} error={errors.password} />
                <Password title="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
            </Section>

            {/* Submit Button */}
            <div className="mt-6">
                <ButtonBlack title="Submit" isLoading={isLoading} />
            </div>
        </form>
    );
}
