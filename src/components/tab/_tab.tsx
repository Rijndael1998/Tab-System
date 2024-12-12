"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button, FormGroup, FormControlLabel, Switch, Stack, Box } from '@mui/material';
import { Tab } from './tab.extra';
import { stickyCellStyle } from './tab.styles';
import { TabRow } from './tabRow';


class UIState {
    // input timesheet
    tab?: Tab;

    // ui elements
    inputs: Array<Array<HTMLInputElement>>;
    applyToFollowingDays = true;

    constructor(tab?: Tab) {
        this.inputs = [];
        this.tab = tab;
    }

    registerInputElement(element: HTMLInputElement) {
        // add change handler and remove any previous ones
        element.onchange = (e) => this.handleChange(e);
    }

    handleChange(e: Event) {
        // specify the target
        const target = e.target as HTMLInputElement;

        // prevent users from typing in nonsense
        let value = Number.parseFloat(target.value);
        value = isNaN(value) ? 0 : Math.min(1, Math.max(0, value));

        // recalculate anything necessary
        this.updateTotals();
    }

    updateTotals() {
        console.log("updated totals");
    }
}

export function TabComponent() {
    // the current state.
    const [tab, setTab] = useState<Tab>();

    // refs. nice because logic can be handled in the inputs directly an no direct rerenders occur giving it much better performance
    const uiState = useRef<UIState>(new UIState(tab));

    // calculate if the object is loaded
    const loading: boolean = !(tab);

    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden', my: 3 }} elevation={1}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={stickyCellStyle}>Name</TableCell>
                            <TableCell style={stickyCellStyle}>Balance</TableCell>
                            {/* <TableCell style={stickyCellStyle}>Name</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading ? tab!.entries.map((entry, index) => {
                            return <TabRow
                                ref={(element) => {
                                    if (!element)
                                        return;

                                    uiState.current.registerInputElement(element);
                                }}
                                key={entry.name}
                                tab={entry}
                            />
                        }) :
                            <></>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    </>;
};