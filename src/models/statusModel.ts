import { Document, Model, model, Schema } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface IStatus extends Document{
    name: string,
    createdAt:Date
} 


const statusSchema = new Schema({
    name:{type:String,required:true},
    createdAt:{type:Date,required:true}
})

const StatusModel:Model<IStatus> =  model<IStatus>('status',statusSchema)

export default StatusModel