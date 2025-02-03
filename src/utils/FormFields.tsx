import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormButton } from "./Buttons";
import { format, setMonth, setYear, getYear, getMonth } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface MultiSelectProps {
    label: string;
    options: string[];
    selectedOptions: string[];
    onSelect: (value: string) => void;
    onRemove: (value: string) => void;
}

export function MultipleSlection({ label, options, selectedOptions, onSelect, onRemove }: MultiSelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
            <select
                className="mt-1 block p-2 border rounded-md shadow-sm focus:ring-1 sm:text-sm dark:bg-gray-700 dark:text-white"
                onChange={(e) => onSelect(e.target.value)}
                value=""
            >
                <option value="" disabled>Select a course</option>
                {options
                    .filter((option) => !selectedOptions.includes(option))
                    .map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
            </select>

            {/* Selected Courses as Tags */}
            <div className="mt-2 flex flex-wrap gap-2">
                {selectedOptions.map((option) => (
                    <div key={option} className="flex items-center px-2 py-1 rounded-md border hover:shadow-lg duration-300 dark:hover:shadow-slate-700">
                        {option}
                        <button
                            onClick={() => onRemove(option)}
                            className="ml-2 rounded-full font-bold w-5 h-5 flex items-center justify-center"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface DateFieldProps {
    title: string;
    value: Date | null;
    onChange: (date: Date) => void;
    startYear?: number;
    endYear?: number;
}

export function DateField({ title, value, onChange, startYear = getYear(new Date()) - 70, endYear = getYear(new Date())}: DateFieldProps) {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);

    const handleMonthChange = (month: string) => {
        if (value) {
            const newDate = setMonth(value, months.indexOf(month));
            onChange(newDate);
        }
    };
    const handleYearChange = (year: string) => {
        if (value) {
            const newDate = setYear(value, parseInt(year));
            onChange(newDate);
        }
    };

    const handleSelect = (selectedDate: Date) => {
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className="w-[240px] justify-start text-left font-normal dark:bg-gray-700 dark:text-white">
                    <CalendarIcon />
                    {value ? format(value, "PPP") : <span>{title}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 " align="start">
                <div className="flex justify-between p-2">
                    {/* Month Selector */}
                    <Select onValueChange={handleMonthChange} value={months[getMonth(value || new Date())]}>
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month} value={month}>{month}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Year Selector */}
                    <Select onValueChange={handleYearChange} value={getYear(value || new Date()).toString()}>
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Calendar Display */}
                <Calendar
                    mode="single"
                    selected={value || undefined}
                    onSelect={(selectedDate) => selectedDate && handleSelect(selectedDate)}
                    initialFocus
                    month={value || new Date()}
                    onMonthChange={(newDate) => onChange(newDate)}
                />
            </PopoverContent>
        </Popover>
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
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

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

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">{title}</h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 items-center">{children}</div>
        </div>
    );
}