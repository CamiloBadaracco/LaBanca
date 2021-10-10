import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { CreateUsertDto } from '../infrastructure/controllers/dto/create-user.dto';
import { UserRepository } from '../infrastructure/repository/user.respository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private agentRepository: UserRepository,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.agentRepository.getUsers();
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.agentRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return found;
  }

  async getUserByEmail(email: string): Promise<User> {
    const found = await this.agentRepository.findOne({ where: { email } });

    if (!found) {
      throw new NotFoundException(`User with email "${email}" not found`);
    }

    return found;
  }

  async createUser(createUserDto: CreateUsertDto): Promise<User> {
    return await this.agentRepository.createUser(createUserDto);
  }
}
