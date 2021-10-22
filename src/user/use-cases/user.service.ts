import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { CreateUsertDto } from '../infrastructure/controllers/dto/create-user.dto';
import { UpdateUserDto } from '../infrastructure/controllers/dto/update-user.dto';
import { UserRepository } from '../infrastructure/repository/user.respository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
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
    return await this.userRepository.createUser(createUserDto);
  }

  
  
  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const {id,name,lastName,userName,pass,mail} = updateUserDto;

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
  
 
  async deleteUser(userName: string): Promise<User>{
    const found = await this.userRepository.findOne({ where: { userName } });

    if (!found) {
      throw new NotFoundException(`User with userName "${userName}" not found`);
    }
    
     return await this.userRepository.deleteUser(found.id);
  }

}
