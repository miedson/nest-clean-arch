import {
  FactoryProvider,
  InjectionToken,
  NotFoundException,
  OptionalFactoryDependency,
} from '@nestjs/common';
import IRepository from '../../../application/interfaces/IRepository';
import { UseCasesProviders } from './types';

const useCaseProviderFactory = (
  provideName: string,
  useCases: UseCasesProviders[],
) => {
  const useCase = useCases.find((useCase) => useCase.name === provideName);
  if (!useCase) {
    throw new NotFoundException(`UseCase not found for ${provideName}`);
  }
  const UseCaseInstance = useCase.instance;
  const RepositoryService = useCase.repository;
  return {
    provide: provideName,
    useFactory: (repositoryService: IRepository): FactoryProvider<any> => {
      return new UseCaseInstance(repositoryService);
    },
    inject: [RepositoryService] as unknown as (
      | InjectionToken
      | OptionalFactoryDependency
    )[],
  };
};

export default useCaseProviderFactory;
