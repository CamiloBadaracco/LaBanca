import {
  BadRequestException,
  Controller,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { MESSAGES } from "@nestjs/core/constants";
import { InjectRepository } from "@nestjs/typeorm";
import { json, response } from "express";
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

    if (!found) {
      throw new NotFoundException(`User with userName "${userName}" not found`);
    }

    return found;
  }

  async createUser(createUserDto: CreateUsertDto): Promise<User> {
    console.log(createUserDto.pass);
    return await this.userRepository.createUser(createUserDto);
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { id, name, lastName, userName, pass, mail } = updateUserDto;

    const found = await this.userRepository.findOne({ where: { userName } });

    if (!found) {
      throw new NotFoundException(`User with userName "${userName}" not found`);
    }

    updateUserDto.id = found.id;
    updateUserDto.pass = found.pass;

    return await this.userRepository.updateUser(updateUserDto);
  }

  async changePassword(updateUserDto: UpdateUserDto): Promise<User> {
    let userName = updateUserDto.userName;

    const found = await this.userRepository.findOne({ where: { userName } });

    if (!found) {
      throw new NotFoundException(`User with userName "${userName}" not found`);
    }

    found.pass = updateUserDto.pass;

    return await this.userRepository.updateUser(found);
  }

  async deleteUser(userName: string): Promise<User> {
    const found = await this.userRepository.findOne({ where: { userName } });

    if (!found) {
      throw new NotFoundException(`User with userName "${userName}" not found`);
    }

    return await this.userRepository.deleteUser(found.id);
  }

  async login(userName: string, pass: string): Promise<User> {
    console.log(
      "Login service " + " || username: " + userName + "   pass" + pass
    );

    const found = await this.userRepository.findOne({ where: { userName } });

    console.log(userName + " /  " + pass);

    if (!found) {
      throw new BadRequestException("invalid credentials");
    } else {
      if (!found.checkPassword(pass)) {
        throw new BadRequestException("invalid credentials");
      }
    }

    console.log("2");
    found.pass = "";

    return found;
  }
}
