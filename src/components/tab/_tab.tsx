"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button, FormGroup, FormControlLabel, Switch, Stack, Box } from '@mui/material';
import { Tab } from './tab.extra';
import { TabRow } from './tabRow';
import { sleep } from '../util';
import { socket } from "@/socket";
import { SocketEvents } from '../socket/events';


class UIState {
    // input tab
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
        socket.emit(SocketEvents.TabUpdate, this.tab);
        console.log("updated totals");
    }
}

export function TabComponent() {
    // the current state.
    const [tab, setTab] = useState<Tab>();

    // refs. nice because logic can be handled in the inputs directly an no direct rerenders occur giving it much better performance
    const uiState = useRef<UIState>(new UIState(tab));

    // calculate if the object is loaded
    const loading: boolean = !(tab && socket.connected);

    useEffect(() => {
        (async () => {
            await sleep(2);

            console.log("sleep");
            setTab({
                entries: [
                    { "name": "test", "balance": 5 },
                    { "name": "test 2", "balance": 15 },
                    { "name": "test 3", "balance": -15 },
                ]
            });
        })();
    }, []);

    useEffect(() => {
        if(loading)
            return;

        socket.on(SocketEvents.TabUpdate, (e) => {
            console.log("new tab update", e);
        });


        return () => {
            
        }
    }, [loading]);

    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden', my: 3 }} elevation={1}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell>Change</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading ? tab!.entries.map((entry) => {
                            return <TabRow
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