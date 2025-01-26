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

export async function passwordChange(userId:string,data:any) {

    const user = await prisma.user.findUnique({
        where:{
            user_id: userId
        }
    })
    if(!user) {
        throw new Error("User not found")
    }
    const isMatch = await matchPassword(data.oldPassword,user.password)
    if(!isMatch) {
        throw new Error("Old password does not match")
    }
    else {
        const password = await hashPassword(data.password)
        return await prisma.user.update({
            where: {
                user_id: userId
            },
            data: {
                password: password
            }
        })
    }
    
}