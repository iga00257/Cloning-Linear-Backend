
import { Document, Model, model, Schema } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface IIssue extends Document {
  issueId: string
  comment: string
  authorName: string
  authorId: ObjectId
  createdAt: Date
  updatedAt: Date
}

const commentSchema: Schema = new Schema({
  issueId: { type: String, required: true },
  commentMessage: { type: String, required: true },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  createdAt: { type: Date, required: true},
  updatedAt: { type: Date, required: true},

});

const ProjectModel: Model<IIssue> = model<IIssue>('Comments', commentSchema);

export default ProjectModel;