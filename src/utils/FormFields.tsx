import React from "react";

export function Input({ title, value, name, 
    onChange, 
    type = 'text' }: { title: string; value: string; name: string; 
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;  
        type?: string; }) {

    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">{title}</label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={onChange}
                placeholder={title}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
        </div>
    )
}