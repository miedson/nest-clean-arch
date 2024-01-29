import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import UseCase from '../../../application/usecases/interfaces/UseCase';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(
    private configService: ConfigService,
    @Inject('CreateAccount') private createAccountUseCase: UseCase,
    @Inject('GetAllAccounts') private getAllAccountsUseCase: UseCase,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.createAccountUseCase.execute(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }
  @Get()
  async findAll() {
    try {
      return await this.getAllAccountsUseCase.execute();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
