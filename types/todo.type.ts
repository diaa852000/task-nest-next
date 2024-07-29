export default interface ITodo {
    title: string;
    description: string;
    isComplete?: boolean;
    dueDate?: string
    categories?: string[];
    user: string;
}