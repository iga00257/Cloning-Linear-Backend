import Role from "../models/roleModel";
import UserModel, { IUser } from "../models/userModel";


export async function createRoles() {
  if (! await Role.findOne({ name: 'admin' })) {
    await Role.create({
        name: 'admin',
        permissions: ['createUsers', 'readUsers', 'updateUsers', 'deleteUsers','leaveComments','createTasks', 'updateTasks', 'deleteTasks', 'readTasks','leaveComments'],
      });
  }
  if (!await Role.findOne({ name: 'guest' })) {
    await Role.create({
        name: 'guest',
        permissions: ['readUsers','readTasks'],
      });           
  }
  if (!await Role.findOne({ name: 'teamMember' })) {
    await Role.create({
        name: 'teamMember',
        permissions: ['readUsers', 'createUsers', 'updateUsers','createTasks', 'updateTasks', 'deleteTasks', 'readTasks','leaveComments'],
      });           
  }

}

export async function createUsers() {
  console.log('createUsers')
    if (! await UserModel.findOne({ name: 'admin' })) {
      await UserModel.create({
        name:'admin',
        roles:['admin','guest'],
        password:'admin',
        createdAt:Date(),
        updatedAt:Date()
      })
    }
    if (!await UserModel.findOne({ name: 'jane' })) {
    await UserModel.create({
      name:'jane',
      roles:['guest'],
      password:'123456',
      createdAt:Date(),
      updatedAt:Date()
    })
    .catch(err=>console.log(err))
    }
        
}



export async function assignRoles() {
  const john:any = await UserModel.findOne({ name: 'john' });
  john.roles = ['guest', 'admin'];
  await john.save();
    const jane:any = await UserModel.findOne({ name: 'jane' });
    jane.roles = ['guest'];
    await jane.save();
}
