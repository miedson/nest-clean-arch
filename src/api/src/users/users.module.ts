import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import CreateAccount from '../../../application/usecases/CreateAccount';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import GetAllAccounts from '../../../application/usecases/GetAllAccounts';
import useCaseProviderFactory from 'src/utils/UseCaseProviderFactory';
import { UseCasesProviders } from 'src/utils/types';
import { UsersService } from './users.service';

const useCases: UseCasesProviders[] = [
  {
    name: 'CreateAccount',
    instance: CreateAccount,
    repository: UsersService,
  },
  {
    name: 'GetAllAccounts',
    instance: GetAllAccounts,
    repository: UsersService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    useCaseProviderFactory('CreateAccount', useCases),
    useCaseProviderFactory('GetAllAccounts', useCases),
    UsersService,
    // {
    //   provide: 'UseCaseCreateAccount',
    //   useFactory: (usersRepositoryService: UsersRepositoryService) => {
    //     return new CreateAccount(usersRepositoryService);
    //   },
    //   inject: [UsersRepositoryService],
    // },
  ],
  exports: [UsersService],
})
export class UsersModule {}
