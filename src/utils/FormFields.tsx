import React from "react";

export function Input({ title, value, name, onChange, type = 'text', error }: {
    title: string;
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
                placeholder={title}
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

