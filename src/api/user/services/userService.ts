import prisma from "../../../utils/db.js";
import { hashPassword, matchPassword } from "../utils/passwordUtils.js";

export async function createUser(data: any) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })
    if(existingUser) {
        throw new Error("User already exists")
    }
    const hashedPassword = await hashPassword(data.password)
    return await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword
        }
    })
}

export async function validateUserLogin(email:string,enteredPassword:string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    if(!user) {
        throw new Error("User not found")
    }
    const isMatch = await matchPassword(enteredPassword,user.password)
    if(!isMatch) {
        throw new Error("Invalid credentials")
    }
    return user

}