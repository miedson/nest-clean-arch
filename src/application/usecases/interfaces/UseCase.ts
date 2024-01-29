export default abstract class UseCase {
  abstract execute(input?: any): Promise<any>;
}
