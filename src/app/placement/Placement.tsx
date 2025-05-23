"use client";

import { useState } from "react";
import { createPlacementEnquery } from "@/actions/StudentEnquery";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FormButton } from "@/utils/Buttons";
import { PlacementFormData, placementSchema } from "@/utils/ValidationSchema";
import Image from "next/image";
import { initialPlacement } from "@/types/types";
import { toast } from "sonner";

const levrageData = [
    {
        image: '/placement/expertise.webp',
        title: 'Industry-Ready Talent',
        descriprtion: 'Our students undergo comprehensive training and projects to ensure they are prepared for real-world challenges.',
    },
    {
        image: '/placement/personalized.webp',
        title: 'Personalized Recruitment ',
        descriprtion: 'We assist recruiters throughout the hiring process, from pre-screening to scheduling interviews, making recruitment hassle-free.',
    },
    {
        image: '/placement/talent-management.webp',
        title: 'Diverse Talent Pool',
        descriprtion: 'We offer candidates from multipledisciplines including IT,management, commerce, and more,catering to varied hiring needs.',
    },
    {
        image: '/placement/foundation.webp',
        title: 'Strong Industry Connections',
        descriprtion: 'Our placement cell maintains longterm relationships with top companies, ensuring quality placement opportunities.',
    },
    {
        image: '/placement/provision.webp',
        title: 'Flexible Recruitment Options',
        descriprtion: 'Whether virtual or on-campus drives, we adapt to your preferred hiring method for maximum convenience.',
    },
    {
        image: '/placement/dedication.webp',
        title: 'Dedicated Placement Team',
        descriprtion: 'Our experienced placement officers are committed to providing timely assistance and ensuring smooth coordination.',
    },
    {
        image: '/placement/shopping.webp',
        title: 'Proven Placement Record',
        descriprtion: 'We have a strong track record of successful placements across various industries, reflecting the quality and readiness.',
    },
    {
        image: '/placement/hiring.webp',
        title: 'Zero Placement Fees',
        descriprtion: 'Our services are completely free for recruiters, fostering a win-win partnership without any financial burden.',
    },
]

const fields = [
    { label: "First Name", name: "firstName", placeholder: "John" },
    { label: "Last Name", name: "lastName", placeholder: "Doe" },
    { label: "Email Id", name: "email", placeholder: "john@example.com", type: "email" },
    { label: "Phone Number", name: "phoneNumber", placeholder: "123-456-7890", type: "tel" },
    { label: "Website", name: "website", placeholder: "www.john.com" },
    { label: "Linkedin id", name: "linkedin", placeholder: "Linkedin" },
    { label: "Company", name: "companyName", placeholder: "Company Name" },
    { label: "Address", name: "address", placeholder: "123 Apt." },
]

export default function Placement() {
    const [formdata, setFormData] = useState(initialPlacement);
    const [errors, setErrors] = useState<Partial<Record<keyof PlacementFormData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const parsed = placementSchema.safeParse(formdata);

        if (!parsed.success) {
            const fieldErrors: Partial<Record<keyof PlacementFormData, string>> = {};
            parsed.error.errors.forEach((err) => {
                const field = err.path[0] as keyof PlacementFormData;
                fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            setIsSubmitting(false);
            return;
        }

        try {
            const payload = new FormData();
            payload.append("name", `${formdata.firstName} ${formdata.lastName}`);
            payload.append("email", formdata.email);
            payload.append("phoneNumber", formdata.phoneNumber);
            payload.append("website", formdata.website);
            payload.append("linkedin", formdata.linkedin);
            payload.append("companyName", formdata.companyName);
            payload.append("address", formdata.address);

            await createPlacementEnquery(payload);

            toast.success("Form submitted successfully!");
            setFormData(initialPlacement);
            setErrors({});
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="pb-10">
            <div className="bg-gradient-to-b from-primary/5 to-transparent dark:from-primary dark:to-transparent">
                <div className="container mx-auto p-4 sm:py-12 flex flex-col items-center">
                    <div className="relative h-[200px] sm:h-[400px] aspect-square">
                        <Image 
                            src='/placement/placement.webp' 
                            alt="Placement Image" 
                            fill 
                            className="object-contain"
                            priority
                        />
                    </div>
                    <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl pb-4 text-center max-w-[900px] bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                        Welcome to the placement cell bridging talent and industry.
                    </h1>
                    <p className="pt-4 pb-15 leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg lg:text-xl text-center max-w-[1000px]">
                        We build strong industry-academia relations to ensure successful
                        placements for our students and valuable hires for your organization.
                        Let&apos;s work together to create career opportunities.
                    </p>
                </div>

                <h2 className="uppercase font-bold text-2xl md:text-4xl lg:text-5xl text-center bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                    Meet our Hr
                </h2>
                <Separator orientation='horizontal' className="my-7 !w-1/2 mx-auto bg-primary/20" />
            </div>

            {/* HR Section */}
            <div className="lg:container mx-auto p-4 flex flex-col md:flex-row gap-12 md:gap-16 justify-center items-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl my-8">
                <div className="relative h-[300px] lg:h-[330px] xl:h-[400px] w-full md:w-1/3 lg:w-1/4">
                    <Image 
                        src='/placement/hr-background.webp' 
                        alt='Hr Background' 
                        fill 
                        className="z-10 object-contain" 
                    />
                    <Image 
                        src='/placement/hr-image.webp' 
                        alt='HR Portrait' 
                        fill 
                        className="z-20 !left-16 sm:!left-0 !w-[200px] lg:!w-[250px] object-contain" 
                    />
                </div>

                <div className="flex flex-col gap-6 md:w-1/2">
                    <h3 className="font-bold text-3xl sm:text-4xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                        Divya Vyas
                    </h3>
                    <div>
                        <h4 className="font-semibold text-xl sm:text-2xl text-gray-800 dark:text-gray-200 mb-4">
                            About
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-[500px]">
                            A dedicated and results-oriented MBA candidate with a
                            strong foundation in finance and business analytics.
                            Seeking to leverage my analytical skills and strategic
                            thinking to contribute to a dynamic and innovative
                            organization.
                        </p>
                    </div>
                </div>
            </div>

            <h3 className="text-center font-bold text-3xl sm:text-5xl py-10">Leverage Our Expertise to <br /> Find the Right Talent</h3>
            <h4 className="text-center text-xl pb-5">we are committed to building strong industry relationships and providing companies <br />
                with access to highly skilled, motivated, and job-ready talent</h4>

            <div className="lg:container mx-auto p-4 md:my-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    levrageData.map((item) => (
                        <div key={item.title} className="group relative border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary rounded-xl p-5 flex flex-col gap-5 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="relative w-12 aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                                <Image 
                                    src={item.image} 
                                    alt={item.title} 
                                    fill 
                                    className="p-1 rounded-lg object-contain transition-transform duration-300 group-hover:scale-110" 
                                />
                            </div>
                            <div>
                                <h5 className="font-bold text-xl mb-2 text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                                    {item.title}
                                </h5>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {item.descriprtion}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <h5 className="text-center font-bold text-3xl sm:text-5xl py-10 uppercase">Get in touch with our training & placement Team</h5>
            <Separator orientation='horizontal' className="my-7 !h-1 !w-3/4 mx-auto" />

            <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-5 py-10 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
                    {fields.map(({ label, name, placeholder, type = "text" }) => (
                        <div key={name} className="space-y-2">
                            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                {label}
                            </label>
                            <Input
                                id={name}
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                value={formdata[name as keyof PlacementFormData]}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:ring-primary dark:focus:ring-primary text-gray-900 dark:text-gray-100"
                            />
                            {errors[name as keyof PlacementFormData] && (
                                <p className="text-red-500 text-sm mt-1">{errors[name as keyof PlacementFormData]}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-center mt-8">
                    <FormButton 
                        title={isSubmitting ? "Submitting..." : "Submit"} 
                        className="w-full md:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-white dark:text-white font-medium py-2.5 rounded-lg transition-all duration-300 disabled:opacity-50" 
                        disabled={isSubmitting} 
                    />
                </div>
            </form>
        </div>
    );
}