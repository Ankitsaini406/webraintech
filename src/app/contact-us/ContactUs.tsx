'use client';

import { useState, ChangeEvent, FormEvent } from "react";
import { Input, TextArea } from "@/utils/FormFields";
import { createContactUs } from "@/actions/StudentEnquery";
import { toast } from "sonner";
import Image from "next/image";

interface FormData {
    name: string;
    email: string;
    phoneNumber: string;
    message: string;
}
function ContactUs() {

    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.message) newErrors.message = "Enter your message";
        if (!formData.email) newErrors.email = "Email is required";
        if (formData.phoneNumber === "+91" || formData.phoneNumber.length < 13) {
            newErrors.phoneNumber = "Valid phone number is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await createContactUs(new FormData(e.target as HTMLFormElement));
            setFormData({
                name: "",
                email: "",
                phoneNumber: "",
                message: "",
            });
            toast.success("Enquery submitted successfully");
        } catch (error) {
            toast.error("Error submitting form");
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 md:gap-8 mb-8">
            <div className="relative bg-linear-to-b from-transparent to-black-opacity-30 h-[500px] w-full">
                <div className="absolute inset-0 bg-linear-to-t from-transparent to-black/40 z-2" />
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/40 z-2" />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-6xl z-10 text-white">Contact Us</h1>
                <Image src='/contactus.webp' alt="Contact Us" title="Contact Us" className="object-cover" placeholder="blur" blurDataURL="/webrainBannerPlaceHolder.webp" fill />
            </div>
            <div className="container mx-auto px-4">

                <h2 className="font-bold text-xl md:text-3xl text-center mb-4 md:mb-10">Let&apos;s Start a Conversation</h2>

                <div className="flex flex-col md:flex-row mb-4 md:mb-10 gap-5 md:gap-10 md:justify-center">
                    <div className="flex flex-col md:flex-[0.75]">
                        <h3 className="text-lg md:text-2xl font-medium mb-5 md:mb-10">Ask how we can help you:</h3>
                        <h4 className="text-base md:text-xl font-semibold mb-2">Address</h4>
                        <p className="font-light mb-6 md:mb-10 text-gray-600">Opp. Magal Trasport Lines, Near Chandpool gate, Sikar, Rajsthan</p>

                        <h4 className="text-base md:text-xl font-semibold mb-2">Phone Number</h4>
                        <p className="font-light mb-6 md:mb-10 text-gray-600">+91 8233101033</p>

                        <h4 className="text-base md:text-xl font-semibold mb-2">Email</h4>
                        <a href="mailto:info@webraintech.in" className="font-light mb-6 md:mb-10 text-gray-600">info@webraintech.in</a>
                    </div>

                    <div className="flex-1 lg:flex-[0.75]">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                name="name"
                                title="Name"
                                type="text"
                                placeholder="Full Name"
                                onChange={handleChange}
                                value={formData.name}
                                error={errors.name}
                            />
                            <Input
                                name="email"
                                title="Email"
                                type="email"
                                placeholder="Your Email"
                                onChange={handleChange}
                                value={formData.email}
                                error={errors.email}
                            />
                            <Input
                                name="phoneNumber"
                                title="Phone Number"
                                type="tel"
                                placeholder="+91 Enter Your Number"
                                onChange={handleChange}
                                value={formData.phoneNumber}
                                error={errors.phoneNumber}
                            />
                            <TextArea
                                name="message"
                                title="Message"
                                onChange={handleChange}
                                value={formData.message}
                                className="w-full p-2 border rounded-md"
                                error={errors.message}
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isLoading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="w-full h-[400px] m-auto">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1406.3016693028756!2d75.13453509889692!3d27.609120414261007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca5c6b764d8ad%3A0x4cc2cfdc103c4783!2sWeBrainTech!5e0!3m2!1sen!2sin!4v1740718401461!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;