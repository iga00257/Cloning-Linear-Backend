import permissionController from '../controllers/permissionController';


export async function createPermissions() {
    // check if permissions exist
    const permissions  = await permissionController.getPermissions();
    if(permissions.length > 0){
        return
    }
    const userPermission:any  = {
        name: 'user',
        read: ['admin','guest'],
        write: ['admin'],
        delete: ['admin'],
        createdAt: new Date,
        updatedAt: new Date
    }
    await permissionController.createPermission(userPermission);
    const projectPermission:any  = {
        name: 'project',
        read: ['admin','guest','teamMember'],
        write: ['admin','teamMember'],
        delete: ['admin','teamMember'],
        createdAt: new Date,
        updatedAt: new Date
    }
    await permissionController.createPermission(projectPermission);
    const statusPermission:any  = {
        name: 'status',
        read: ['admin','guest','teamMember'],
        write: ['admin','teamMember'],
        delete: ['admin','teamMember'],
        createdAt: new Date,
        updatedAt: new Date
    }
    await permissionController.createPermission(statusPermission);
    const issuePermission:any  = {
        name: 'issue',
        read: ['admin','guest','teamMember'],
        write: ['admin','teamMember'],
        delete: ['admin','teamMember'],
        createdAt: new Date,
        updatedAt: new Date
    }
    await permissionController.createPermission(issuePermission);
        
}