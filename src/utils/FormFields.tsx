import React from "react";
import { FormButton } from "./Buttons";

export function Input({ title, palceholder, value, name, onChange, type = 'text', error }: {
    title: string;
    palceholder?: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    error?: string;
}) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{title}</label>
            <input
                type={type === 'phone' ? 'tel' : type }
                inputMode={type === 'phone' ? 'tel' : undefined }
                value={value}
                name={name}
                onChange={onChange}
                placeholder={palceholder ? palceholder : title}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm 
                    ${error ?  'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' :  'border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400'} 
                    dark:bg-gray-700 dark:text-white`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}


export function TextArea({ title, value, name, onChange, error }: {
    title: string;
    value: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
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
                    ${error ?  'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' :  'border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400'} 
                    dark:bg-gray-700 dark:text-white`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

export function NewsLetter({error}: {error?: string}) {
    return (
        <div className="w-full md:w-auto flex flex-col gap-4 md:gap-2">
            <div>
            <h2 className="text-xl font-bold">Subscribe to our Newsletter</h2>
            <p className="text-sm text-gray-400">Stay updated with the latest courses, trends, and tips. Subscribe<br></br> to our newsletter and elevate your expertise!</p>
            </div>
            <form className="relative">
                <input
                placeholder="Enter your email"
                className={`mt-1 block min-w-[300px] w-full sm:max-w-[500px] px-2 py-[6px] md:px-3 md:py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 sm:text-sm 
                    ${error ?  'border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:ring-red-500' :  'border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-400'} 
                    dark:bg-gray-700 dark:text-white`}
                />
                <FormButton title="Subscribe" disabled={false} className="absolute z-10 top-[2px] -right-[13px] sm:-right-[1px] sm:top-[2.2px]"/>
            </form>
        </div>
    );
}
