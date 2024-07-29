'use client';

import Todo from "@/components/Todo";
import { fetchTodosThunk } from "@/lib/redux/features/todo/todo.thunk";
import { AppDispatch, RootState } from "@/lib/redux/store/store";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TodoList() {
    const todos = useSelector((state: RootState) => state.todo);
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch<AppDispatch>();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));


    useEffect(() => {
        if(auth.data?.id){
            dispatch(fetchTodosThunk(auth.data?.id))
        }

    },[dispatch, auth.data?.id])

    return(
        <Box
            display={'flex'}
            flexDirection={isSmallScreen ? 'column' : 'row'}
            justifyContent={'space-between'}
            gap={2}
        >
            {todos?.data?.map((todo, index) => (
                <Todo
                    key={index}
                    title={todo.title}
                    description={todo.description}
                    dueDate={todo.dueDate}
                    categories={todo.categories}
                />
            ))}
        </Box>
    )
}