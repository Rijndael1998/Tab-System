import { TabComponent } from "@/components/timesheet/_timesheet";
import SocketIOStatus from "./SocketIOStatus";
import { Container, Paper, Stack } from "@mui/material";

export default function Home() {
    return <Container maxWidth="lg" sx={{margin: "1em auto"}}>
        <Stack gap={1}>
            <Paper>
                <Container maxWidth="md">
                    <SocketIOStatus />
                    <TabComponent />
                </Container>
            </Paper>
        </Stack>
    </Container>;
}
