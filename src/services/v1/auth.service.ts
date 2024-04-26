import bcrypt from "bcrypt";
import UserService from "@services/v1/user.service";
interface IRegisterUser {
  username: string;
  email: string;
  password: string;
}

class Auth {
  async register(user: IRegisterUser) {
    const userService = new UserService();
    const hashedPassword = await this.hashPassword(user.password);
    try {
      const newUser = await userService.create({
        email: user.email,
        username: user.username,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new Error(
        "Qualcosa è andato storto nella creazione del nuovo utente"
      );
    }
  }
  async updatePassword(userId: string, password: string) {
    const userService = new UserService();
    
    const hashedPassword = await this.hashPassword(password);
    const newUser = await userService.updatePassword({ userId, password:hashedPassword });
    console.log(newUser,'usr');
    
    return newUser;
  } catch(error: any) {
    throw new Error(
      "Qualcosa è andato storto nella modifica della password"
    );
  }

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
export default Auth;
