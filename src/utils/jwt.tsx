import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined");
}

export const createToken = (payload: object): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};

export const verifyToken = (token: string): object | string => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        console.error("Token verification failed:", error);
        throw new Error("Invalid or expired token");
    }
};

export const decodeToken = (token: string): object | string | null => {
    try {
        return jwt.decode(token); 
    } catch (error) {
        console.error("Token decoding failed:", error);
        return null;
    }
};