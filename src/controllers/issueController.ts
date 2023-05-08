import { Request, Response } from 'express';
import ProjectModel,{IIssue} from '../models/issueModel';

class ProjectController {

  async createProject(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    try {
    const projectData: IIssue = req.body;
    projectData.createdAt = new Date
    const project = new ProjectModel(projectData);
    const newProject = await project.save();
    res.status(201).json(newProject);
    } catch (err) {
    res.status(500).json({ message: err });
    }
    }

  async getProjects(req:Request,res:Response):Promise<void>{
    try {
        const projects =await ProjectModel.find()
        res.status(201).json(projects)
    } catch (err) {
        res.status(500).json({ message: err})
    }
  }

  async getProjectById(req:Request,res:Response):Promise<void>{
    try {
        const project = await ProjectModel.findOne({_id:req.query.projectId})
        res.status(201).json(project)

    } catch (err) {
        res.status(500).json({ message: err})
        
    }
  }

  async updateProject(req:Request,res:Response):Promise<void>{
    try {
        const projectData:IIssue = req.body;
        const project = await ProjectModel.updateOne({_id:projectData._id},projectData)
        res.status(201).json({data:project})
    } catch (error) {
        res.status(500).json({message:error})
    }
  }

  async deleteProject(req:Request,res:Response):Promise<void>{
    console.log(req.query.projectId)
    try {
      const projectId = req.query.projectId
      await ProjectModel.deleteOne({_id:projectId})
      .then((data)=>{
        console.log(data)
        res.status(201).json({message:"Project deleted"})

      })
    } catch (error) {
      res.status(500).json({message:error})
    }
    
  }
}

export default new ProjectController();