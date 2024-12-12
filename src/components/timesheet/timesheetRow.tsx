"use client";

import { TableCell, TableRow } from "@mui/material"
import { TimesheetInput } from "./timesheetInput"
import { stickyCellStyle } from "./timesheet.styles"
import { forwardRef } from "react";
import { TabEntry } from "./timesheet.extra";

export type TimesheetRowType = {
    tab: TabEntry,
}

export const TimesheetRow = forwardRef<HTMLInputElement, TimesheetRowType>(
    ({ tab }: TimesheetRowType, ref) => <TableRow sx={{ minWidth: "10em", padding: "0.5em", height: "5em" }}>
        <TimesheetInput
            ref={ref}
            disabled={false}
            value={tab.balance}
            name={tab.name}
        />
    </TableRow>)
