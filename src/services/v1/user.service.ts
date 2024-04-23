import { UserModel } from "@models/users.model";

  interface userCreateDTO{
    email:string,
    username:string,
    password:string

  }

class User {
  constructor() {}

  async create({email,username,password}:userCreateDTO) {
    try {
      
      const newUserInstance = new UserModel({
        email,
        password,
        username,
      });
      const newUser = await newUserInstance.save();
      return newUser;
    } catch (error) {
      throw new Error('qualcosa è andato storto')
    }
  }
  async findById(_id: string) {
    try {
      const user = await UserModel.findById(_id);

      return user;
    } catch (e) {
      throw new Error("Qualcosa è andato storto");
    }
  }

  async getAll() {
    const users = await UserModel.find();
    return users;
  }

  async findByUsername(username: string) {
    const user = await UserModel.findOne({ username });
    return user;
  }
  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    console.log(user);
    
    return user;
  }
}

export default User;
