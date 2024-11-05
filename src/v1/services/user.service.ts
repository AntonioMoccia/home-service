import dataSource from '@v1/config/db';
import { User as UserEntity, UserRole } from '@v1/entities/user.entity'
interface userCreateDTO {
  email: string,
  username: string,
  password: string

}
interface passwordUpdateDTO {
  userId: string,
  password: string

}
const userRepository = dataSource.getRepository(UserEntity)
class User {
  constructor() { }

  async create({ email, username, password }: userCreateDTO) {
    console.log('User.create invoked');
    try {
      const newUser = userRepository.create({
        email,
        username,
        password
      })
      await userRepository.save(newUser)

      return newUser
    } catch (error) {
      throw new Error('qualcosa è andato storto')
    }
  }
  async findById(id: string) {
    try {
      const user = await userRepository.findOne({
        where: {
          id
        }
      });

      return user;
    } catch (e) {
      throw new Error("Qualcosa è andato storto");
    }
  }

  async getAll() {
    const users = await userRepository.find();
    return users;
  }
  async updatePassword(userDTO: passwordUpdateDTO) {
    try {
      const user = await userRepository.update(userDTO.userId, {
        password: userDTO.password
      })
      return user
    } catch (error) {
      throw new Error("Qualcosa è andato storto");
    }
  }

  async findByUsername(username: string) {
    const user = await userRepository.findOne({ where: { username } });
    return user;
  }
  async findByEmail(email: string) {
    const user = await userRepository.findOne({ where: { email } });

    return user;
  }
  async update(userId:string,userUpdate:Partial<UserEntity>){
    try {      
      const updatedUser = await userRepository.update(userId,{
        ...userUpdate
      })
      return updatedUser
    } catch (error) {
      if(error instanceof Error){
        throw new Error(error.message)
      }
      throw new Error(`errore sconosciuto in fase di modifca dell'utente`)
    }
  }
}

export default User;
