"use client";

import { TableCell, TableRow } from "@mui/material"
import { TabInput } from "./timesheetInput"
import { stickyCellStyle } from "./timesheet.styles"
import { forwardRef } from "react";
import { TabEntry } from "./timesheet.extra";

export type TabRowType = {
    tab: TabEntry,
}

export const TabRow = forwardRef<HTMLInputElement, TabRowType>(
    ({ tab }: TabRowType, ref) => <TableRow sx={{ minWidth: "10em", padding: "0.5em", height: "5em" }}>
        <TabInput
            ref={ref}
            disabled={false}
            value={tab.balance}
            name={tab.name}
        />
    </TableRow>)
