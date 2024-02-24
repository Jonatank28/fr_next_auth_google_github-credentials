'use server'

import { db } from "@/lib/prisma"
import bcrypt from "bcrypt"

interface FormData {
  username: string
  email: string
  password: string
}

export const createUser = async (data: FormData) => {
  if(data) {

    const isUserExists = await db.user.findUnique({
      where: {
          email: data.email
      }
  })
    if(isUserExists) {
      return { status: false, message: 'User already exists' }
    }
  
    const hashedPassword = await bcrypt.hash(data.password, 10)
  
    await db.user.create({
      data: {
        email: data.email,
        name: data.username,
        hashedPassword
      }
  })
      return {status: true,  message: 'User created'}  
  } else {
    return { status: false, message: 'User not created, check your data' }
  }
}