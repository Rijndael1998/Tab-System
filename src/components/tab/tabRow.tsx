"use client";

import { Button, TableCell, TableRow, Typography } from "@mui/material"
import { forwardRef, useState } from "react";
import { TabEntry } from "./tab.extra";
import { TabBalanceInput, TabNameInput } from "./tabInput";
import { socket } from "@/socket";
import { SocketEvents } from "../socket/events";

export type TabRowType = {
    tab: TabEntry,
}

export const TabRow = forwardRef<HTMLInputElement, TabRowType>(({ tab }: TabRowType, ref) => {
    const [balance, setBalance] = useState(tab.balance);
    const [name, setName] = useState(tab.name);
    const posBal = balance < 0;


    return <TableRow sx={{ minWidth: "10em", padding: "0.5em", height: "5em" }}>
        <TabNameInput
            disabled={false}
            value={name}
            name={name}
        />
        <TableCell>
            <Typography color={posBal ? "error" : "text"}>
                {`${posBal ? "-" : ""}£${Math.abs(balance)}`}
            </Typography>
        </TableCell>
        <TabBalanceInput
            disabled={false}
            value={0}
            name={tab.name}
        />
        <TableCell>
            <Button onClick={() => {
                socket.emit(SocketEvents.TabUpdate, {balance, name} as TabEntry);
            }}>
                Apply Change
            </Button>
        </TableCell>
    </TableRow>

})
