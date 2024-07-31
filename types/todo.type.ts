
export default interface ITodo {
    _id: string;
    title: string;
    description: string;
    isCompleted: string;
    dueDate: string
    categories?: string[];
    user?: string;
}