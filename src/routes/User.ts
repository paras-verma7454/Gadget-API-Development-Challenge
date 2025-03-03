require('dotenv').config();
import express from "express";
import { PrismaClient } from '@prisma/client'
import {  sign } from "jsonwebtoken";
const JWT_SECRET = process.env.JWT;


const prisma = new PrismaClient()

const userRouter = express.Router();


userRouter.post('/signup', async (req, res):Promise<any> => {
    const { username, password } = req.body;
    const existingUser = await prisma.user.findUnique({
        where: {
            username
        },
        });

        if (existingUser) {
        res.status(400);
        return res.json({ message: "Username already taken" });
        }
        const user = await prisma.user.create({
        data: {
            username: username,
            password: password,
        },
        });

        const token = await sign({ id: user.userId }, JWT_SECRET as string)
        
        return res.json({
        jwt: token
        })

})

userRouter.get('/signin', async (req, res):Promise<any> => {
    const {username, password} = req.body
    const user = await prisma.user.findUnique({
        where:{
            username,
            password
        }
    })

    if (!user) {
        res.status(403);
        return res.json({ message: "user not found / Incorrect Creds" });
    }
  
    const token = await sign({ id: user.userId }, JWT_SECRET as string);
    return res.json({ jwt:token });
})










module.exports = userRouter