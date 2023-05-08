import StatusModel,{IStatus} from "../models/statusModel";
import {Request,Response} from "express";



class statusController {

    async getAllStatus(req:Request,res:Response):Promise<void>{
        try {
            const status = await StatusModel.find()
            res.status(201).json(status)
        } catch (err) {
            res.status(500).json({message:err})
        }
    }

    async createStatus(req:Request,res:Response):Promise<void>{
        try {
            const statusData:IStatus = req.body;
            statusData.createdAt = new Date
            const status = new StatusModel(statusData);
            const newStatus = await status.save();
            res.status(201).json(newStatus)
        } catch (err) {
            res.status(500).json({message:err})
        }
    }

    async getStatusById(req:Request,res:Response):Promise<void>{
        try {
            const statusId = req.query.statusId
            const status = await StatusModel.find({_id:statusId})
            res.status(201).json(status)
        } catch (error) {
            res.status(500).json({message:error})
        }

    }

    async updateStatus(req:Request,res:Response):Promise<void>{
        try {
            const statusData:IStatus = req.body;
            const status = await StatusModel.updateOne({_id:statusData._id},statusData)
            res.status(201).json({data:status})
        } catch (error) {
            res.status(500).json({message:error})
        }
    }

    async deleteStatus(req:Request,res:Response):Promise<void>{
        try {
            const statusId = req.query.statusId
            await StatusModel.deleteOne({_id:statusId})
            res.status(201).json({message:"Status deleted"})
        } catch (error) {
            res.status(500).json({message:error})
        }
    }

}

export default new statusController()