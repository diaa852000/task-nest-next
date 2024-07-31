import ISliceState from "@/types/slice.type";
import ITodo from "@/types/todo.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createTodoThunk, deleteTodoThunk, fetchTodosThunk, findOneTodoThunk, updateTodoThunk } from "./todo.thunk";
import IApiResponse from "@/types/api.type";

interface TodoState extends ISliceState<ITodo[]> {
    singleTodo: ITodo | null;
    selectedCategories: string[] 

}

const initialState: TodoState = {
    isLoading: true,
    hasError: null,
    data: [],
    singleTodo: null,
    selectedCategories: []
};


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // handleSelectedCategories: (state, action) => {
        //     const newSelectedCategory = action.payload;
        //     if (!state.selectedCategories.includes(newSelectedCategory)) {
        //         const newCategories = [...state.selectedCategories, newSelectedCategory]
        //         state.selectedCategories = newCategories;
        //     } else {
        //         const newCategories = state.selectedCategories.filter(category => category !== newSelectedCategory);
        //         state.selectedCategories = newCategories
        //     }
        // }
        handleSelectedCategories: (state, action) => {
            const newSelectedCategory = action.payload;
            if (!state.selectedCategories.includes(newSelectedCategory)) {
                state.selectedCategories.push(newSelectedCategory);
            } else {
                state.selectedCategories = state.selectedCategories.filter(
                    category => category !== newSelectedCategory
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // POST
            .addCase(createTodoThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = null;
            })
            .addCase(createTodoThunk.fulfilled, (state, action: PayloadAction<IApiResponse<ITodo>>) => {
                state.isLoading = false;
                state.hasError = null;
                if(state.data && action.payload.data) {
                    state.data.push(action.payload.data);
                }
            })
            .addCase(createTodoThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = action.error.message || "Something went wrong";
            })

            // FIND
            .addCase(fetchTodosThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = null;
            })
            .addCase(fetchTodosThunk.fulfilled, (state, action: PayloadAction<IApiResponse<ITodo[]>>) => {
                state.isLoading = false;
                state.hasError = null;
                state.data = action.payload.data;
            })
            .addCase(fetchTodosThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = action.error.message || 'Something went wrong';
            })

            // FIND ONE
            .addCase(findOneTodoThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = null;
            })
            .addCase(findOneTodoThunk.fulfilled, (state, action: PayloadAction<IApiResponse<ITodo>>) => {
                state.isLoading = false;
                state.hasError = null;
                state.singleTodo = action.payload.data;
            })
            .addCase(findOneTodoThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = action.error.message || 'Something went wrong';
            })

            // DELETE
            .addCase(deleteTodoThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = null;
            })
            .addCase(deleteTodoThunk.fulfilled, (state, action: PayloadAction<IApiResponse<ITodo>>) => {
                state.isLoading = false;
                state.hasError = null;
                if (state.data && action.payload.data !== null) {
                    state.data = state.data.filter(todo => todo._id !== action.payload.data?._id);
                }
            })
            .addCase(deleteTodoThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = action.error.message || 'Something went wrong';
            })

            // UPDATE
            .addCase(updateTodoThunk.pending, (state) => {
                state.isLoading = true;
                state.hasError = null;
            })
            .addCase(updateTodoThunk.fulfilled, (state, action: PayloadAction<IApiResponse<ITodo>>) => {
                state.isLoading = false;
                state.hasError = null;
                if (state.singleTodo && action.payload.data !== null) {
                    state.singleTodo = action.payload.data;
                }
            })
            .addCase(updateTodoThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.hasError = action.error.message || 'Something went wrong';
            })
    }
})

export const {handleSelectedCategories} = todoSlice.actions;
export default todoSlice.reducer;