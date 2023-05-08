import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/userModel';

class UserController {

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err})
      }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserModel.findOne({_id:req.query.userId});
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err})
      }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
    const userData: IUser = req.body;
    userData.createdAt = new Date
    userData.updatedAt = new Date
    const user = new UserModel(userData);
    const newUser = await user.save();
    res.status(201).json(newUser);
    } catch (err) {
    res.status(500).json({ message: err });
    }
    }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
    const userData: IUser = req.body;
    userData.updatedAt = new Date

    const updatedUser = await UserModel.updateOne({_id:userData._id},userData).catch((err) => {
      res.status(500).json({ message: err });
      throw new Error("User not found");
    }).then((user) => {
      return UserModel.findOne({_id:userData._id})
      });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      throw new Error("User not found");
    }
    console.log(updatedUser)
    res.status(201).json({updatedUser});
    }
    catch (err) {
    res.status(500).json({ message: err });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.query.userId
      await UserModel.deleteOne({_id:userId})
      res.status(201).json({message:"User deleted"})
    } catch (error) {
      res.status(500).json({message:error})
      
    }
  }

}


export default new UserController();