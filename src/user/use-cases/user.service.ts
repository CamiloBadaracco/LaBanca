import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Console } from "console";
import { Exception } from "handlebars";
import { User } from "../domain/user.entity";
import { CreateUsertDto } from "../infrastructure/controllers/dto/create-user.dto";
import { UpdateUserDto } from "../infrastructure/controllers/dto/update-user.dto";
import { UserRepository } from "../infrastructure/repository/user.respository";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getUsers();
  }

  async getUserById(userName: string): Promise<User> {
    const found = await this.userRepository.findOne({ where: { userName } });

    if (!found) throw new NotFoundException(`Usuario no existe, userName:"${userName}" .`);

    return found;
  }

  async getUserById2(id: number): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) throw new NotFoundException(`Usuario no existe, id:"${id}" .`);

    return found;
  }

  async createUser(createUserDto: CreateUsertDto): Promise<User> {
    const { name, lastName, userName, pass, mail, roles } = createUserDto;

    const userExistent = await this.userRepository.findOne({ where: { userName } });
    if (userExistent) throw new HttpException("El usuario ya existe.", 797);

    const user = new User();
    user.name = name;
    user.lastName = lastName;
    user.userName = userName;
    user.hashPassword(pass);
    user.mail = mail;
    user.roles = [roles];

    return await this.userRepository.createUser(user);
  }

  async updateUser(updateUserDto: UpdateUserDto, UserEntity?: User): Promise<User> {
    const { id, name, lastName, userName, pass, mail, roles } = updateUserDto;

    let user = await this.userRepository.findOne({ where: { userName } });
    if (!user) throw new NotFoundException(`User with userName "${userName}" not found`);

    user.name = name;
    user.lastName = lastName;
    user.hashPassword(pass);
    user.mail = mail;
    user.roles = [roles];

    return await this.userRepository.updateUser(user);
  }

  //Usuario que no sea admin , podra actualizar su propio usuario, si no le paso entity es porque es admin.
  async updateOwnUser(updateUserDto: UpdateUserDto, UserEntity?: User): Promise<User> {
    const { id, name, lastName, userName, pass, mail, roles } = updateUserDto;
    //Si se le pasa UserEntity comprobamos que el usuario sea el mismo usuario que el que se queire editar, sino  devolvemos null
    const user = await this.userRepository.findOne({ where: { userName } }).then((u) => (!UserEntity ? u : !!u && UserEntity.id === u.id ? u : null));

    if (!user) throw new NotFoundException(`Usuario inexistente, o no autenticado`);

    user.name = name;
    user.lastName = lastName;
    user.hashPassword(pass);
    user.mail = mail;

    return await this.userRepository.updateUser(user);
  }

  async changePassword(updateUserDto: UpdateUserDto): Promise<User> {
    let userName = updateUserDto.userName;

    const user = await this.userRepository.findOne({ where: { userName } });

    if (!user) {
      throw new NotFoundException(`User with userName "${userName}" not found`);
    }

    user.hashPassword(updateUserDto.pass);

    return await this.userRepository.updateUser(user);
  }

  async deleteUser(userName: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userName } });

    if (!user) {
      throw new NotFoundException(`User with userName "${userName}" not found`);
    }

    return await this.userRepository.deleteUser(user.id);
  }

  async login(userName: string, pass: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { userName } });

    if (!user) {
      throw new HttpException("Credenciales incorrectas", 795);
    } else {
      if (!user.checkPassword(pass)) {
        throw new HttpException("Credenciales incorrectas", 795);
      }
    }

    user.pass = "";

    return user;
  }
}
