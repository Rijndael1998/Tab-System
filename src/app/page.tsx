import { TimesheetComponent } from "@/components/timesheet/_timesheet";
import SocketIOStatus from "./SocketIOStatus";

export default function Home() {
    return <>
        <SocketIOStatus />
        <TimesheetComponent />
    </>;
}
