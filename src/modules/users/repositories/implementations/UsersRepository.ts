import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
		return await this.repository.findOneOrFail({id: user_id}, { relations: ['games']});
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    return await this.repository.query('SELECT first_name from users ORDER BY first_name ASC');
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    return await this.repository.query('SELECT email, first_name, last_name FROM users WHERE first_name ILIKE $1 and last_name ILIKE $2',[
      `%${first_name}%`,
      `%${last_name}%`,
    ]
    );
  }
}
