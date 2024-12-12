"use client";

import { TableCell, TableRow } from "@mui/material"
import { TimesheetInput } from "./timesheetInput"
import { DaysOfTheMonth, Project, ProjectEntries } from "./timesheet.extra"
import { stickyCellStyle } from "./timesheet.styles"
import { forwardRef } from "react";

export type TimesheetRowType = {
    project: Project,
    daysOfTheMonth: DaysOfTheMonth,
    entries: ProjectEntries,
}

export const TimesheetRow = forwardRef<HTMLInputElement, TimesheetRowType>(
    ({ project, daysOfTheMonth, entries }: TimesheetRowType, ref) => <TableRow sx={{ minWidth: "10em", padding: "0.5em", height: "5em" }}>
        <TableCell style={stickyCellStyle} component="th" scope="row">
            {project.name}
        </TableCell>
        {daysOfTheMonth.map((day) => {
            return <TimesheetInput
                ref={ref}
                disabled={day.holiday}
                key={day.day}
                value={entries[day.day]}
                projectId={project.id}
                day={day.day}
            />
        })}
    </TableRow>)
