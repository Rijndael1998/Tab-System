"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button, FormGroup, FormControlLabel, Switch, Stack, Box } from '@mui/material';
import { Tab } from './timesheet.extra';
import { stickyCellStyle } from './timesheet.styles';
import { TimesheetRow } from './timesheetRow';
import { Random, sleep } from './../util';


class UIState {
    // input timesheet
    timesheet?: Tab;

    // ui elements
    inputs: Array<Array<HTMLInputElement>>;
    dayTotalCounters: Array<HTMLDivElement>;
    applyToFollowingDays = true;

    constructor(timesheet?: Tab) {
        this.inputs = [];
        this.dayTotalCounters = [];
        this.timesheet = timesheet;
    }

    private static getDayAndProjectId(element: HTMLInputElement): [projectId: string, day: number] {
        const datasetParentNode = element?.parentNode?.parentNode as HTMLElement;
        const dataset = datasetParentNode.dataset;

        if (!datasetParentNode || !dataset)
            throw Error("Dataset or the correct parent is missing. Did you set this function on the right element? It should be 2 parents above the ref object (designed to be used with TextInput).");

        const projectId = dataset.projectid;
        const day = dataset.day;

        if (!projectId || !day)
            throw Error("Required elements from dataset are missing. Did you set the handle change function on the wrong element? Did you set `data-projectid` and `data-day` JSX properties?");

        return [projectId, Number.parseInt(day)];
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

export function TimesheetComponent() {
    // the current timesheet state.
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
                            return <TimesheetRow
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
        <FormGroup sx={{ my: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ flexWrap: "wrap", gap: "1em" }}>
                <Stack direction="row" spacing={2} sx={{ height: "100%" }}>
                    <Button sx={{ my: 1 }}
                        color='error'
                        variant="contained"
                        size='large'
                        onClick={() => console.log(uiState)}
                        disabled={loading}
                    >
                        Reset
                    </Button>

                    <FormControlLabel
                        control={
                            <Switch
                                defaultChecked={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    uiState.current.applyToFollowingDays = e.target.checked;
                                }}
                                disabled={loading}
                            />
                        }
                        label={"Apply value to following days"}
                        sx={{ my: 1 }}
                    />
                </Stack>
                <Stack direction="row" spacing={2} sx={{ height: "100%" }}>
                    <Button sx={{ my: 1 }}
                        color='primary'
                        variant="contained"
                        size='large'
                        disabled={loading}
                    >
                        Save Changes
                    </Button>
                    <Button sx={{ my: 1 }}
                        color='success'
                        variant="contained"
                        size='large'
                        disabled={loading || true} // there's more to this component that's not implemented yet so it's perma disabled rn
                    >
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </FormGroup>
    </>;
};