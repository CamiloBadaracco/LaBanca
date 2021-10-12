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

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }
 

  async createUser(createUserDto: CreateUsertDto): Promise<User> {
    return await this.userRepository.createUser(createUserDto);
  }

  
  
  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userRepository.updateUser(updateUserDto);
  }
  
  async deleteUser(id: number): Promise<User>{
     return await this.userRepository.deleteUser(id);
  }

}
