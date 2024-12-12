"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Button, FormGroup, FormControlLabel, Switch, Stack, Box } from '@mui/material';
import { DaysOfTheMonth, Projects, Timesheet } from './timesheet.extra';
import { stickyCellStyle } from './timesheet.styles';
import { TimesheetRow } from './timesheetRow';
import { Random, sleep } from '../util';


class UIState {
    // input timesheet
    timesheet?: Timesheet;

    // ui elements
    inputs: Array<Array<HTMLInputElement>>;
    dayTotalCounters: Array<HTMLDivElement>;
    applyToFollowingDays = true;

    constructor(timesheet?: Timesheet) {
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

    private getProjectIndex(projectId: string): number {
        if (!this.timesheet)
            throw Error("Timesheets is undefined. We need the project index from the timesheets");

        const index = this.timesheet.projectIDs.indexOf(projectId);
        if (index == -1)
            throw Error("Couldn't find the index of the project");

        return index;
    }

    registerInputElement(element: HTMLInputElement) {
        // add change handler and remove any previous ones
        element.onchange = (e) => this.handleChange(e);

        // extract relavent info
        const [projectId] = UIState.getDayAndProjectId(element);

        // this won't need speeding up because of the small (~5) projects. Who is going to use Binary Search on a 5 element list?
        const projectIndex = this.getProjectIndex(projectId);

        // make the array if needed. (We can't perpare beforehand with the correct number of projects so we need to do it this way)
        while (this.inputs.length - 1 < projectIndex)
            this.inputs.push([]);

        // get the corresponding array reference
        const inputArray = this.inputs[projectIndex];

        // add input to the array, skipping the days where the input doesn't exist
        inputArray.push(element);
    }

    handleChange(e: Event) {
        // specify the target
        const target = e.target as HTMLInputElement;

        // prevent users from typing in nonsense
        let value = Number.parseFloat(target.value);
        value = isNaN(value) ? 0 : Math.min(1, Math.max(0, value));

        // get the project and day from the input element
        const [projectId, day] = UIState.getDayAndProjectId(target);

        // check if this needs to be carried over and apply if it does
        if (this.applyToFollowingDays)
            for (const input of this.inputs[this.getProjectIndex(projectId)])
                if (UIState.getDayAndProjectId(input)[1] >= day)
                    input.value = value.toFixed(2);

        // recalculate anything necessary
        this.updateTotals();
    }

    updateTotals() {
        const totals = new Map<number, number>();
        for (let projectIndex = 0; projectIndex < this.inputs.length; projectIndex++) {
            for (const input of this.inputs[projectIndex]) {
                const day = UIState.getDayAndProjectId(input)[1];

                // try to get the total from the hashmap or override with 0
                let total = totals.get(day) ?? 0;

                total += Number.parseFloat(input.value);

                totals.set(day, total);
            }
        }

        // apply the total to every label
        totals.forEach((value, key) => {
            if (this.dayTotalCounters.length > key)
                this.dayTotalCounters[key].textContent = value.toFixed(2);
        });
    }
}

export function TimesheetComponent() {
    const [daysOfTheMonth, setDaysOfTheWeek] = useState<DaysOfTheMonth>([]);
    const [projects, setProjects] = useState<Projects>([]);

    // the current timesheet state.
    const [timesheet, setTimesheet] = useState<Timesheet>();

    // refs. nice because logic can be handled in the inputs directly an no direct rerenders occur giving it much better performance
    const uiState = useRef<UIState>(new UIState(timesheet));

    // the value needs to be reset during re-renders
    uiState.current.dayTotalCounters = new Array();

    // Load the projects
    useEffect(() => {
        // do some fake fetching
        (async () => {
            await sleep(3_000);

            setProjects([
                {
                    id: "0",
                    name: "UK - Domain - GDS Re-serves Development"
                },
                {
                    id: "1243561",
                    name: "UK - Domain - DIP & O Management"
                },
                {
                    id: "262514354",
                    name: "UK - Domain - GDS Collections"
                },
                {
                    id: "84573253",
                    name: "UK - BAU - IT Admin and Meetings"
                },
                {
                    id: "123457",
                    name: "UK - Other"
                },
            ]);
        })();
    }, []);

    // Fetch the timesheet
    useEffect(() => {
        // Fake fetching
        (async () => {
            await sleep(1_000);
            const daysOfWeek: DaysOfTheMonth = [];
            for (let day = 0; day <= 30; day++)
                daysOfWeek.push({ day, holiday: day % 7 < 2 });

            setDaysOfTheWeek(daysOfWeek);

            // a side effect of this rerender is that the array is remade
            uiState.current.dayTotalCounters = [];
        })();
    }, []);

    // Load the entries into storage
    useEffect(() => {
        // Waiting for projects to finish fetching
        if (!projects || !daysOfTheMonth)
            return;

        const projectIDs = projects.map((project) => {
            return project.id;
        });

        // Fake timesheet month fetching
        (async () => {
            await sleep(3_000);

            const fetchedTimesheet: Timesheet["entries"] = [];
            projectIDs.forEach((_) => {
                const fetchedDays = daysOfTheMonth.map((day) => {
                    return day.holiday ? 0 : Random(0, 0.8, 0.05);
                });

                fetchedTimesheet.push(fetchedDays);
            });

            const newTimesheet: Timesheet = {
                projectIDs: projectIDs,
                entries: fetchedTimesheet,
            };

            uiState.current = new UIState(newTimesheet);

            setTimesheet(newTimesheet);
        })();
    }, [projects, daysOfTheMonth]);

    // calculate if the object is loaded
    const loading: boolean = !(projects.length > 0 && daysOfTheMonth?.length != 0 && timesheet?.entries.length != 0);

    return <>
        <Paper sx={{ width: '100%', overflow: 'hidden', my: 3 }}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={stickyCellStyle}>Project Name</TableCell>
                            {daysOfTheMonth.map((day) => (
                                <TableCell key={day.day} sx={{ textAlign: "center" }}>{day.day + 1}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading ? timesheet!.entries.map((entry, index) => {
                            const project = projects[index];
                            return <TimesheetRow
                                ref={(element) => {
                                    if (!element)
                                        return;

                                    uiState.current.registerInputElement(element);
                                }}
                                key={project.id}
                                project={project}
                                daysOfTheMonth={daysOfTheMonth}
                                entries={entry}
                            />
                        }) :
                            <></>
                        }
                        <TableRow>
                            <TableCell style={stickyCellStyle} component="th" scope="row" sx={{ minWidth: "10em" }}>
                                Total
                            </TableCell>
                            {daysOfTheMonth.map((day, index) =>
                                <TableCell key={day.day} sx={{ textAlign: "center" }}>
                                    <Box
                                        component={"div"}
                                        ref={(element: HTMLDivElement) => {
                                            if (!element)
                                                return;

                                            uiState.current.dayTotalCounters.push(element);

                                            // refresh every element on the last pass
                                            if (index + 1 == daysOfTheMonth.length)
                                                uiState.current.updateTotals();

                                        }}>
                                        {day.holiday ? "" : "0.00"}
                                    </Box>
                                </TableCell>
                            )}
                        </TableRow>
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