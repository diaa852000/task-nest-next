export default interface ISliceState<T> {
    isLoading: boolean;
    hasError: null | string;
    data: T | null;
}