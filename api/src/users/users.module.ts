import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import CreateAccount from '../../../application/usecases/CreateAccount';
import { UsersRepositoryService } from './users-repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import GetAllAccounts from '../../../application/usecases/GetAllAccounts';
import useCaseProviderFactory from 'src/utils/UseCaseProviderFactory';
import { UseCasesProviders } from 'src/utils/types';

const useCases: UseCasesProviders[] = [
  {
    name: 'CreateAccount',
    instance: CreateAccount,
    repository: UsersRepositoryService,
  },
  {
    name: 'GetAllAccounts',
    instance: GetAllAccounts,
    repository: UsersRepositoryService,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersRepositoryService,
    useCaseProviderFactory('CreateAccount', useCases),
    useCaseProviderFactory('GetAllAccounts', useCases),
    // {
    //   provide: 'UseCaseCreateAccount',
    //   useFactory: (usersRepositoryService: UsersRepositoryService) => {
    //     return new CreateAccount(usersRepositoryService);
    //   },
    //   inject: [UsersRepositoryService],
    // },
  ],
  exports: [UsersRepositoryService],
})
export class UsersModule {}
