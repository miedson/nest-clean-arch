export default abstract class IRepository {
    abstract create(input: any): Promise<any>
    abstract findAll(): Promise<any>
    abstract find(input: any): Promise<any>
    abstract update(): Promise<any>
    abstract delete(): Promise<any>
}