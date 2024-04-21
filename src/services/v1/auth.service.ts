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
        ...user,
        password: hashedPassword,
      });
      return newUser;
    } catch (error) {
      throw new Error(
        "Qualcosa è andato storto nella creazione del nuovo utente"
      );
    }
  }
  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  }
}
export default Auth;
