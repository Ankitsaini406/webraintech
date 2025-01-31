import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormButton } from "./Buttons";

export function Input({ title, palceholder, value, name, onChange, type = 'text', error, className }: {
    title: string;
    palceholder?: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
    className?: string;
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{title}</label>
            <input
                type={type === 'phone' ? 'tel' : type}
                inputMode={type === 'phone' ? 'tel' : undefined}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={palceholder ? palceholder : title}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm 
                    ${error ? 'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400'} 
                    dark:bg-gray-700 dark:text-white ${className}`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export function TextArea({ title, value, name, onChange, error, className }: {
    title: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
    className?: string;
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{title}</label>
            <textarea
                value={value}
                name={name}
                onChange={onChange}
                placeholder={title}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm 
                    ${error ? 'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400'} 
                    dark:bg-gray-700 dark:text-white ${className}`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export function Password({ title, placeholder, value, name, onChange, error, className }: {
    title: string;
    placeholder?: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
}) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{title}</label>
            <div className="relative">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    value={value}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder ? placeholder : title}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm 
                        ${error ? 'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400'} 
                        dark:bg-gray-700 dark:text-white pr-10 ${className}`}
                />
                {/* Eye Icon Button */}
                <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute inset-y-0 right-3 text-gray-500 dark:text-gray-300"
                >
                    {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

type NewsLetterProps = {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    error?: string;
    onSubmit: (e: React.FormEvent) => void;
};

export function NewsLetter({ email, setEmail, loading, error, onSubmit }: NewsLetterProps) {

    return (
        <div className="w-full md:w-auto flex flex-col gap-4 md:gap-2">
            <div>
                <h2 className="text-xl font-bold">Subscribe to our Newsletter</h2>
                <p className="text-sm text-gray-400">Stay updated with the latest courses, trends, and tips. Subscribe<br /> to our newsletter and elevate your expertise!</p>
            </div>
            <form className="relative" onSubmit={onSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`mt-1 block min-w-[300px] w-full sm:max-w-[500px] px-2 py-[6px] md:px-3 md:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm 
                    ${error ? 'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400'} 
                    dark:bg-gray-700 dark:text-white`}
                />
                <FormButton title="Subscribe" disabled={loading} className="sm:w-32 absolute z-10 top-[2px] -right-[13px] sm:-right-[1px] sm:top-[2.2px]" />
            </form>
        </div>
    );
}
