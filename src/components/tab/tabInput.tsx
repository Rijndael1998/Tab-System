"use client";

import { Box, TableCell, TextField } from "@mui/material";
import { forwardRef } from "react";

export type TabInputBalanceProps = {
    disabled: boolean,
    value: number,
    name: string,
}

const defaultStyle = { minWidth: "6em" };

export const TabBalanceInput = forwardRef<HTMLInputElement, TabInputBalanceProps>(
    ({ disabled, value, name }: TabInputBalanceProps, ref) => <>
        <TableCell sx={{ px: "0.25em" }}>
            {
                disabled ? <Box sx={defaultStyle} /> : <TextField
                    disabled={disabled}
                    type="number"
                    defaultValue={value.toFixed(2)}
                    slotProps={{htmlInput: { step: 0.10 }}}
                    sx={defaultStyle}
                    data-name={name}
                />
            }
        </TableCell>
    </>);

export type TabInputNameProps = {
    disabled: boolean,
    value: string,
    name: string,
}

export const TabNameInput = forwardRef<HTMLInputElement, TabInputNameProps>(
    ({ disabled, value, name }: TabInputNameProps, ref) => <>
        <TableCell sx={{ px: "0.25em" }}>
            {
                disabled ? <Box sx={defaultStyle} /> : <TextField
                    disabled={disabled}
                    type="text"
                    defaultValue={value}
                    sx={defaultStyle}
                    data-name={name}
                />
            }
        </TableCell>
    </>);
