"use client";

import { Box, TableCell, TextField } from "@mui/material";
import { forwardRef } from "react";

export type TabInputProps = {
    disabled: boolean,
    value: number,
    name: string,
}

const defaultStyle = { minWidth: "6em" };

export const TabInput = forwardRef<HTMLInputElement, TabInputProps>(
    ({ disabled, value, name }: TabInputProps, ref) => <>
        <TableCell sx={{ px: "0.25em" }}>
            {
                disabled ? <Box sx={defaultStyle} /> : <TextField
                    inputRef={ref}
                    disabled={disabled}
                    type="number"
                    defaultValue={value.toFixed(2)}
                    slotProps={{htmlInput: { step: 0.50 }}}
                    sx={defaultStyle}
                    data-name={name}
                />
            }
        </TableCell>
    </>);
