export default interface IApiResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
    error?: {
        statusCode: number;
        name: string;
    };
}
