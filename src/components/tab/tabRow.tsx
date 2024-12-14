"use client";

import { Button, TableCell, TableRow, Typography } from "@mui/material"
import { forwardRef } from "react";
import { TabEntry } from "./tab.extra";
import { TabBalanceInput, TabNameInput } from "./tabInput";

export type TabRowType = {
    tab: TabEntry,
}

export const TabRow = forwardRef<HTMLInputElement, TabRowType>(({ tab }: TabRowType, ref) => {

    const posBal = tab.balance < 0;


    return <TableRow sx={{ minWidth: "10em", padding: "0.5em", height: "5em" }}>
        <TabNameInput
            ref={ref}
            disabled={false}
            value={tab.name}
            name={tab.name}
        />
        <TableCell>
            <Typography color={posBal ? "error" : "text"}>
                {`${posBal ? "-" : ""}£${Math.abs(tab.balance)}`}
            </Typography>
        </TableCell>
        <TabBalanceInput
            ref={ref}
            disabled={false}
            value={0}
            name={tab.name}
        />
        <TableCell>
            <Button>
                Apply Change
            </Button>
        </TableCell>
    </TableRow>

})
