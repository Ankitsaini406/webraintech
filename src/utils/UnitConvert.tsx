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