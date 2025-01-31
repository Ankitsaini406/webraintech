"use client";

import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { Input, Password } from "@/utils/FormFields";
import { AppDispatch } from "@/store/store";
import { FormButton } from "@/utils/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/store/actions/UserActions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const LoginComponent = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: { user: { loading: boolean; error: string | null } }) => state.user);

    const images = [
        { image: '/events/web-technology.webp', alt: 'Web Technology' },
        { image: '/events/ai-pyhon.webp', alt: 'AI Python' },
        { image: '/events/cyber-security.webp', alt: 'Cyber Security' },
        { image: '/events/digital-marketing.webp', alt: 'Digital Marketing' },
        { image: '/events/gaphic-design.webp', alt: 'Graphic Design' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3000); // Auto slide every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    const handleDotClick = (index: number) => {
        setCurrentSlide(index);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(loginUser({ credentials: formData })).unwrap();
            router.push("/");
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
            toast.error(errorMessage);
        }
    };

    return (
        <div className="bg-[lightgray] dark:bg-gray-800 min-h-screen flex justify-center items-center">
            <div className="relative h-[90vh] sm:h-[600px] w-full lg:w-11/12 xl:w-3/4 bg-white dark:bg-black shadow-xl flex flex-col md:flex-row items-center">
                {/* Left Side: Login Form */}
                <div className="flex flex-col w-full h-[500px] justify-center items-center">
                    <div className="relative w-20 h-20 md:w-24 md:h-24">
                        <Link href='/'>
                            <Image alt="WeBrainTech" src='/favicon-192.png' fill />
                        </Link>
                    </div>
                    <div className="bg-background dark:bg-black p-8 w-full h-max">
                        <h1 className="text-4xl font-semibold text-center mb-6 dark:text-white">
                            Welcome Back
                        </h1>
                        <form className="w-full" onSubmit={handleSubmit}>
                            <Input title="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="rounded-none" />
                            <Password title="Password" name="password" value={formData.password} onChange={handleInputChange} className="rounded-none" />
                            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                            <FormButton title={loading ? "Please Wait" : "Sign In"} disabled={loading} className="rounded-none !bg-black dark:!bg-neutral-800 dark:hover:!shadow-slate-500 hover:!shadow-lg mt-6 !text-white !w-full" />
                        </form>
                    </div>
                </div>

                {/* Right Side: Image Slider */}
                <div className="w-full h-full relative">
                    <div className="relative overflow-hidden w-full h-full">
                        <div className="image-slider flex transition-transform duration-500 h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                            {images.map((item, index) => (
                                <div key={index} className="image-slide w-full h-full relative flex-shrink-0">
                                    <Image src={item.image} alt={item.alt} layout="fill" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? "bg-white opacity-100 scale-125" : "bg-gray-400 opacity-50"}`}
                                onClick={() => handleDotClick(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
