import express from "express";
import { PrismaClient } from '@prisma/client'
const authMiddleware = require('./../Middleware')

const prisma = new PrismaClient()

const GadgetRouter = express.Router();
function Generate(){
    return Math.floor(Math.random() * 100)
}
const codenames = ["The Nightingale", "The Kraken", "Shadow Hawk", "Iron Phantom", "Ghost Reaper","Shadow","Nigth Agent"];
const generateCodename = () => codenames[Math.floor(Math.random() * codenames.length)];
const generateConfirmationCode = (): string => Math.floor(100000 + Math.random() * 900000).toString();

// Get all the Gadegts
GadgetRouter.get('/', authMiddleware, async (req, res): Promise<any> => {
        const {status}= req.query

    try{
        const result = await prisma.gadget.findMany({
            where:{
                status: status ? status as any  : {},
            }
        })
        const data = result.map((item) => {
            return `${item.name} - ${Generate()}% success probability`
        })
        return res.json({data})

    }catch(err){
        return res.status(500).json({
            error:"Failed to retrieve gadgets"
        })
    }
})


// Post new Gadget with a randomly generate name
GadgetRouter.post('/', authMiddleware, async (req, res) => {
    const name = generateCodename();
    const result = await prisma.gadget.create({
        data: {
            name
        }
    })
    res.json({result})
})

// Update Gadget name or status
GadgetRouter.put('/:id', authMiddleware, async (req, res): Promise<any> => {
    const { id } = req.params
    const gadget = await prisma.gadget.findUnique({
        where:{
            id
        }
    })
    if(!gadget) return res.json({
        error:"Gadget not found"
    })
    const {name , status} = req.body
    try{

        const result = await prisma.gadget.update({
            where: {
                id
            },
            data: {
                name,
                status
            }
        })
        return res.json({message:"Status updated",status:status})
    }catch(err){
        return res.json({
            error:"Inputs are not valid"
        })
    }
})

// Change Gadget Status to Decomissioned
GadgetRouter.delete('/:id', authMiddleware, async (req, res) : Promise<any> => {
    const { id } = req.params

    const gadget = await prisma.gadget.findUnique({
        where:{
            id
        }
    })
    if(!gadget) return res.json({
        error:"Gadget not found"
    })
    try{
        const result = await prisma.gadget.update({
            where: {
                id
            },
            data: {
                status: 'Decommissioned',
                decommissionedAt: new Date()
            }
        })
        res.json({
             message: "Gadget decommissioned successfully", result
            });

    }catch(err){
        res.status(500).json({
             error: "Failed to decommission the gadget" 
            });
    }
})

GadgetRouter.get('/:id/self-destruct',authMiddleware, async (req, res) : Promise<any> =>{
    const {id} = req.params
    const Code =generateConfirmationCode()
    const gadget = await prisma.gadget.findUnique({
        where:{
            id
        }
    })
    if(!gadget) return res.json({
        error:"Gadget not found"
    })
    await prisma.gadget.update({
        where:{
            id,
        },
        data:{
            selfDestructCode: Code
        }
    })

    return res.json({
        selfDestructCode: Code
    })
})
GadgetRouter.post('/:id/self-destruct',authMiddleware, async (req, res) : Promise<any> =>{
    const {id} = req.params
    const {selfDestructCode}= req.body
    const gadget = await prisma.gadget.findUnique({
        where:{
            id
        }
    })
    if(!gadget) return res.json({
        error:"Gadget not found"
    })
    if(gadget.selfDestructCode !== selfDestructCode) return res.json({Message:"Self destruct code is incorrect"})
    await prisma.gadget.delete({
        where:{
            id,
        },
    })

    return res.json({
        message:"Gadget will be deleted in 5 seconds..."
    })
})

module.exports = GadgetRouter;


