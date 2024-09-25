import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = this.userRepository.create({
        userName: username,
        password: hashedPassword,
      });
      Logger.log(
        `New new user added, user name :${newUser.userName}`,
        'UserService',
      );
      return this.userRepository.save(newUser);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { userName: username } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
