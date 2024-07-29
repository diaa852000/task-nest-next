import Navbar from "@/components/Navbar";
import { Box, Container } from "@mui/material";
import dynamic from "next/dynamic";
import { ReactNode } from "react";



interface layoutProps {
    children: ReactNode;
}

function layout({ children }: layoutProps) {
    return (
        <Box 
            display={"flex"} 
            flexDirection={"column"} 
            gap={2}
        >
            <Navbar />
            <Container maxWidth="xl">
                {children}
            </Container>
        </Box>
    );
}

export default layout;
