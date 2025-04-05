import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Resolver('User')
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // Add a simple Query
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello, Book Management System!';
  }

  @Mutation(() => String)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    await this.usersService.create(username, password);
    return 'User registered successfully';
  }

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username, password);
    if (!user) throw new Error('Invalid credentials');
    const { access_token } = await this.authService.login(user);
    return access_token;
  }
}