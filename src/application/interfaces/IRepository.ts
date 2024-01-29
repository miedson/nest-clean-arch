export default abstract class IRepository {
  abstract create(options?: any): Promise<any>;
  abstract findAll(): Promise<any>;
  abstract find(options?: any): Promise<any>;
  abstract update(): Promise<any>;
  abstract delete(): Promise<any>;
}
