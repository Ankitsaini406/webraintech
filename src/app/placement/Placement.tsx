"use client";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ButtonBlack } from "@/utils/Buttons";
import Image from "next/image";
import { useState } from "react";

const levrageData = [
    {
        image: '',
        title: 'Industry-Ready Talent',
        descriprtion: 'Our students undergo comprehensive training and projects to ensure they are prepared for real-world challenges.',
    },
    {
        image: '',
        title: 'Personalized Recruitment ',
        descriprtion: 'We assist recruiters throughout the hiring process, from pre-screening to scheduling interviews, making recruitment hassle-free.',
    },
    {
        image: '',
        title: 'Diverse Talent Pool',
        descriprtion: 'We offer candidates from multipledisciplines including IT,management, commerce, and more,catering to varied hiring needs.',
    },
    {
        image: '',
        title: 'Strong Industry Connections',
        descriprtion: 'Our placement cell maintains longterm relationships with top companies, ensuring quality placement opportunities.',
    },
    {
        image: '/placement/provision.png',
        title: 'Flexible Recruitment Options',
        descriprtion: 'Whether virtual or on-campus drives, we adapt to your preferred hiring method for maximum convenience.',
    },
    {
        image: '/placement/dedication.png',
        title: 'Dedicated Placement Team',
        descriprtion: 'Our experienced placement officers are committed to providing timely assistance and ensuring smooth coordination.',
    },
    {
        image: '/placement/shopping.png',
        title: 'Proven Placement Record',
        descriprtion: 'We have a strong track record of successful placements across various industries, reflecting the quality and readiness.',
    },
    {
        image: '/placement/hiring.png',
        title: 'Zero Placement Fees',
        descriprtion: 'Our services are completely free for recruiters, fostering a win-win partnership without any financial burden.',
    },
]

const fields = [
    { label: "First Name", name: "firstName", placeholder: "John" },
    { label: "Last Name", name: "lastName", placeholder: "Doe" },
    { label: "Email Id", name: "email", placeholder: "john@example.com", type: "email" },
    { label: "Phone Number", name: "phone", placeholder: "123-456-7890", type: "tel" },
    { label: "Website", name: "website", placeholder: "www.john.com" },
    { label: "Linkedin id", name: "linkedin", placeholder: "Linkedin" },
    { label: "Company", name: "company", placeholder: "Company Name" },
    { label: "Address", name: "address", placeholder: "123 Apt." },
]
type FormData = {
    [key: string]: string
}


export default function Placement() {

    const [formdata, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        website: '',
        linkedin: '',
        company: '',
        address: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value })
    }

    return (
        <div className="pb-10">
            <div className="bg-linear-to-b from-primary">
                <div className="container mx-auto p-4 sm:py-8 flex flex-col items-center">
                    <div className="relative h-[200px] sm:h-[400px] aspect-square">
                        <Image src='/placement/placement.webp' alt="Placement Image" fill />
                    </div>
                    <h1 className="font-bold text-2xl md:text-4xl lg:text-5xl pb-4 uppercase text-center text-white max-w-[900px]">Welcome to the placement cell bridging talent and industry.</h1>
                    <p className="pt-4 pb-15 leading-5 lg:leading-8 font-light md:text-lg lg:text-3xl text-white text-center max-w-[1000px]">We build strong industry-academia relations to ensure successful
                        placements for our students and valuable hires for your organization.
                        Let&apos;s work together to create career opportunities.</p>
                </div>

                <h2 className="uppercase font-bold text-2xl md:text-4xl lg:text-5xl text-center">Meet our Hr</h2>
                <Separator orientation='horizontal' className="my-7 h-4 !w-3/4 mx-auto" />
            </div>

            {/* HR Section */}
            <div className="lg:container mx-auto p-4 flex flex-col md:flex-row gap-12 md:gap-0 justify-around items-center ">
                <div className="relative h-[300px] lg:h-[330px] xl:h-[400px] w-1/2 sm:w-1/3 lg:w-1/5">
                    <Image src='/placement/hr-background.png' alt='Hr Image' fill className="z-10 !left-5" />
                    <Image src='/placement/hr-image.png' alt='Hr Image' fill className="z-10 !w-[200px] lg:!w-[250px]" />
                </div>

                <div className="flex flex-col gap-8">
                    <h3 className="uppercase font-bold text-3xl sm:text-5xl">Divya vyas</h3>
                    <h3 className="font-bold text-xl sm:text-3xl">About</h3>
                    <p className="md:max-w-[300px] lg:max-w-[500px]">A dedicated and results-oriented MBA candidate with a
                        strong foundation in finance and business analytics.
                        Seeking to leverage my analytical skills and strategic
                        thinking to contribute to a dynamic and innovative
                        organization.</p>
                </div>
            </div>

            <h3 className="text-center font-bold text-3xl sm:text-5xl py-10">Leverage Our Expertise to <br /> Find the Right Talent</h3>
            <h4 className="text-center text-xl pb-5">we are committed to building strong industry relationships and providing companies <br />
                with access to highly skilled, motivated, and job-ready talent</h4>

            <div className="lg:container mx-auto p-4 my-10 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {
                    levrageData.map((item) => (
                        <div key={item.title} className="p-5 rounded-lg bg-accent-foreground flex flex-col gap-5">
                            <div className="relative w-12 aspect-square">
                                <Image src={item.image} alt={item.title} fill className="shadow p-1 rounded-lg" />
                            </div>
                            <h5 className="text-foreground font-bold text-xl">{item.title}</h5>
                            <h6 className="text-foreground">{item.descriprtion}</h6>
                        </div>
                    ))
                }
            </div>

            <h5 className="text-center font-bold text-3xl sm:text-5xl py-10 uppercase">Get in touch with our training & placement Team</h5>
            <Separator orientation='horizontal' className="my-7 h-4 !w-3/4 mx-auto" />

            <form className="max-w-5xl mx-auto px-4 py-10">
                <div className="grid gap-10 md:grid-cols-2">
                    {fields.map(({ label, name, placeholder, type = "text" }) => (
                        <div key={name}>
                            <label htmlFor={name} className="block mb-2 font-medium">
                                {label} :
                            </label>
                            <Input
                                id={name}
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                value={(formdata)[name]}
                                onChange={handleChange}
                                className="bg-white text-foreground md:h-14 text-lg"
                                required
                            />
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                <ButtonBlack title="Submit" className="items-center" />
                </div>
            </form>
        </div>
    );
}