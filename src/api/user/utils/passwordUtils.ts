import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const salt:string = await bcrypt.genSalt(16);
    return bcrypt.hash(password, salt);
};

export const matchPassword = async (enteredPassword: string, storedPassword: string): Promise<boolean> => {
    return bcrypt.compare(enteredPassword, storedPassword);
}