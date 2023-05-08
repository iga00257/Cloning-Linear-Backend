
import { Document, Model, model, Schema } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface IIssue extends Document {
  name: string;
  description: string
  assignedUserId?: ObjectId
  statusId: ObjectId
  createdAt: Date
}

const issueSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  assignedUserId: { type: String, required: false },
  type: { type: String, required: false },
  statusId: { type: String, required: true },
  createdAt: { type: Date, required: true},
});

const ProjectModel: Model<IIssue> = model<IIssue>('Issue', issueSchema);

export default ProjectModel;