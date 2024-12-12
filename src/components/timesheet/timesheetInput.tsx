"use client";

import { Box, TableCell, TextField } from "@mui/material";
import { forwardRef } from "react";

export type TimesheetInputProps = {
    disabled: boolean,
    value: number,
    name: string,
}

const defaultStyle = { minWidth: "6em" };

export const TimesheetInput = forwardRef<HTMLInputElement, TimesheetInputProps>(
    ({ disabled, value, name }: TimesheetInputProps, ref) => <>
        <TableCell sx={{ px: "0.25em" }}>
            {
                disabled ? <Box sx={defaultStyle} /> : <TextField
                    inputRef={ref}
                    disabled={disabled}
                    type="number"
                    defaultValue={value.toFixed(2)}
                    inputProps={{ step: 0.05, max: 1, min: 0 }}
                    sx={defaultStyle}
                    data-name={name}
                />
            }
        </TableCell>
    </>);
