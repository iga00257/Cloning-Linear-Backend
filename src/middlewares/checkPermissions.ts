import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import permissionsModel, { IPermission, PermissionTypes } from '../models/permissionsModel';
import dotenv from 'dotenv';
dotenv.config();


export default function checkPermissions(apiName: string, permissionType:PermissionTypes) {

  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("checkPermissions")
    try {

      const token = req.headers.authorization?.split(' ')[1];
      console.log("token",token)

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized No token' });
      }
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET as string);

      const userId = decodedToken.userId;
      const user  = await User.findById(userId);
      
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized No User' });
      }
      
      const hasPermission = await Promise.all(
        // user.roles sample : ["admin","user"]
        user.roles.map(async (role: string) => {
          console.log({ role });
          //apiPermissions sample : {name:"user",read:["admin","user"],write:["admin"]}
          const apiPermissions = await permissionsModel.findOne({name:apiName})
          if (!apiPermissions) {
            return res.status(401).json({ message: 'Unauthorized No API Permissions' });
          }
          return apiPermissions[permissionType].some((permissionRole: any) => role === permissionRole);
          // for (let index = 0; index < apiPermissions[permissionType].length; index++) {
          //   const permissionRole = apiPermissions[permissionType][index];
          //   if (role.includes(permissionRole)) {
          //     return true
          //   }
          // }
          // return false
        })
      ).then((results) => {
        console.log(results)
        return results.some((result:any) => result === true);
      })

      if (!hasPermission) {
        console.log("noPermission")
        return res.status(403).json({ message: 'Forbidden' });
      }
      console.log(hasPermission)
      next();
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'error' });
    }
  };
}
