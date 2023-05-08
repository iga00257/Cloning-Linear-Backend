import { Document, model, Schema } from 'mongoose';

export enum PermissionTypes {
    read = "read",
    write = "write",
    delete = "delete"
  }
  

export type IPermission = Document & Record<PermissionTypes, string[]> & {
    name: string;
    createdAt: Date
    updatedAt: Date
}

const PermissionSchema: Schema = new Schema({
    name: { type: String, required: true },
    read: { type: [String], required: false },
    write: { type: [String], required: false },
    delete: { type: [String], required: false },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: true },
});

export default model<IPermission>('Permission', PermissionSchema);
