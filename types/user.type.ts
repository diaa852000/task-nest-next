import ITodo from "./todo.type";

export default interface IUSer {
    name: string;
    eamil: string;
    password: string;
    todos: ITodo[]
}