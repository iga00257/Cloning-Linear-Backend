import { Request, Response } from 'express';
import PermissionsModel,{type IPermission} from '../models/permissionsModel';

class PermissionController{
    async createPermission(permissionData:IPermission): Promise<any> {
        try{
            permissionData.createdAt = new Date
            const permission = new PermissionsModel(permissionData);
            const newPermission = await permission.save();
            return newPermission
        }
        catch(err){
            console.log(err)
            return err
        }
        
    }

    async getPermissions():Promise<any>{
        try{
            const permissions = await PermissionsModel.find()
            return permissions
        }
        catch(err){
            console.log(err)
            return null
        }
    }

    async updatePermission(req:Request,res:Response):Promise<void>{
        const {permissionId} = req.query
        const {roleId,permissionName,permissionDescription} = req.body
            
            
    }


}

export default new PermissionController();