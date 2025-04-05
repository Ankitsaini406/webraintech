import crypto from 'crypto';

// Function to generate a salt (random string)
export function generateSalt(length: number = 16): string {
    return crypto.randomBytes(length).toString('hex'); // Return random salt in hex format
}

// Function to hash the password with a salt
export function hashPassword(password: string, salt: string) {
    const hash = crypto.createHmac('sha256', salt); // Use HMAC (hash-based message authentication code)
    hash.update(password);
    return hash.digest('hex');  // Return the hash as a hexadecimal string
}

export function createSlug(title: string): string {
    if (!title) {
        throw new Error("Title is required to create a slug");
    }

    return title
        .toLowerCase() // Convert to lowercase
        .trim() // Remove leading/trailing whitespace
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/[^\w-]+/g, ''); // Remove non-alphanumeric characters except hyphens
}

export function truncateText(description: string, maxLength = 100) {
    if (!description) return "";
    return description.length > maxLength
        ? `${description.slice(0, maxLength)}...`
        : description;
};

export function formatterPrice(amount: number): string {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
}

export function getInitials(name: string) {
    return name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
};