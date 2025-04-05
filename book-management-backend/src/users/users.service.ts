import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });
    return user.save();
  }

  async findOne(username: string): Promise<User | null> { // Changed to User | null
    return this.userModel.findOne({ username }).exec();
  }

  async validateUser(username: string, password: string): Promise<User | null> { // Changed to User | null
    const user = await this.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // Mongoose document is fine here since User extends Document
    }
    return null;
  }
}