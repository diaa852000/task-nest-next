'use client';

import ITodo from "@/types/todo.type";
import { Box, Card, CardContent, Checkbox, Chip, duration, FormControlLabel, FormGroup, IconButton, Typography, useMediaQuery, useTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import FlexBetween from "./FlexBetween";
import ClearIcon from '@mui/icons-material/Clear';

export default function Todo(props: ITodo) {
    const { title, description, dueDate, isComplete, categories } = props;
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dueDate ? dayjs(dueDate) : null);

    useEffect(() => {
        if (dueDate) {
            setSelectedDate(dayjs(dueDate));
        }
    }, [dueDate]);

    const handleDateChange = (date: Dayjs | null) => {
        setSelectedDate(date);
        console.log('Selected date:', date ? date.format('YYYY-MM-DD') : 'No date selected');
    };

    return (
        <Box
            width='100%'
            boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
            maxHeight='400px'
            height='200px'
            p={1}
            display='flex'
            flexDirection='column'
        >
            <Box flexGrow={1}>
                <FlexBetween p={0}>
                    <Box
                        p={0}
                        ml={"-12px"}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'start'}
                    >
                        <Checkbox value={isComplete} />
                        <Typography
                            color={'#2f3640'}
                            textTransform={'capitalize'}
                        >
                            {title}
                        </Typography>
                    </Box>
                    <IconButton size="small">
                        <ClearIcon fontSize="small" />
                    </IconButton>
                </FlexBetween>
                <Typography
                    color={'GrayText'}
                    variant="body2"
                >
                    {description}
                </Typography>
            </Box>


            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer  
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'start'

                        }}
                        components={['DatePicker', 'DatePicker']}
                    >
                        <DatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </DemoContainer>
                </LocalizationProvider> */}

            <Box>
                <Box
                    display={'flex'}
                    justifyContent={'start'}
                    alignItems={'center'}
                    gap={1}
                    // pl={1}
                    mt={'4px'}
                >
                    {categories?.map((category, index) => (
                        <Typography
                            key={index}
                            variant="caption"
                            color={index % 2 === 0 ? 'primary' : 'secondary'}
                        >
                            #{category}
                        </Typography>
                    ))}
                </Box>
                <Typography
                    variant="caption"
                    color={'GrayText'}

                >
                    Due: 2024-07-24
                </Typography>
            </Box>
            {/* </Box> */}
        </Box>
    )
}