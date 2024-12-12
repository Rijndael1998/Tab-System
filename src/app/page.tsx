import { TimesheetComponent } from "@/components/timesheet/_timesheet";
import SocketIOStatus from "./SocketIOStatus";
import { Container, Paper, Stack } from "@mui/material";

export default function Home() {
    return <Container maxWidth="lg" >
        <Stack gap={1}>
            <Paper>
                <Container maxWidth="md">
                    <SocketIOStatus />
                    <TimesheetComponent />
                </Container>
            </Paper>
        </Stack>
    </Container>;
}
