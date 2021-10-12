import { EntityRepository, Repository } from 'typeorm';
import { CreateUsertDto } from '../controllers/dto/create-user.dto';
import { User } from '../../domain/user.entity';
import { UpdateUserDto } from '../controllers/dto/update-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');

    const agents = await query.getMany();
    return agents;
  }

  async createUser(createUserDto: CreateUsertDto): Promise<User> {
    const { name,lastName, userName,pass,mail } = createUserDto;

    const user = new User();
    user.name = name;
    user.lastName = lastName;
    user.userName = userName;
    user.pass = pass;
    
    user.mail = mail;
    await user.save();
    return user;
  }

  
  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { name,lastName, userName,pass,mail } = updateUserDto;

    const user = new User();
    user.name = name;
    user.lastName = lastName;
    user.userName = userName;
    user.pass = pass;
    
    user.mail = mail;
    await user.save();
    return user;
  }

  
  
  async deleteUser(id: number ) : Promise<User> {
    const user = new User();
      await this.delete(id);
      return user;
  }
  
}
