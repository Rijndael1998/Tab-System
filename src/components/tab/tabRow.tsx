"use client";

import { TableCell, TableRow } from "@mui/material"
import { stickyCellStyle } from "./tab.styles"
import { forwardRef } from "react";
import { TabEntry } from "./tab.extra";
import { TabBalanceInput, TabNameInput } from "./tabInput";

export type TabRowType = {
    tab: TabEntry,
}

export const TabRow = forwardRef<HTMLInputElement, TabRowType>(
    ({ tab }: TabRowType, ref) => <TableRow sx={{ minWidth: "10em", padding: "0.5em", height: "5em" }}>
        <TabNameInput
            ref={ref}
            disabled={false}
            value={tab.name}
            name={tab.name}
        />
        <TabBalanceInput
            ref={ref}
            disabled={false}
            value={tab.balance}
            name={tab.name}
        />
    </TableRow>)
