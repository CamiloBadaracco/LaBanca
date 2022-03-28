import { EntityRepository, Repository } from "typeorm";
import { User } from "../../domain/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getUsers(): Promise<User[]> {
    const query = this.createQueryBuilder("user");

    const user = await query.getMany();
    return user;
  }

  async createUser(user: User): Promise<User> {
    await user.save();
    return user;
  }

  async updateUser(user: User): Promise<User> {
    await user.save();
    return user;
  }

  async updateOwnUser(user: User): Promise<User> {
    await user.save();
    return user;
  }

  async deleteUser(id: number): Promise<User> {
    const user = new User();
    await this.delete(id);
    return user;
  }
}
