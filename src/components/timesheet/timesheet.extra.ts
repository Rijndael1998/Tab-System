export interface Project {
    id: string;
    name: string;
}

/**
 * The entire timesheet object.
 */
export interface Timesheet {
    projectIDs: Array<string>,

    /**
     * Timesheets are stored by project and then day.
     */
    entries: Array<ProjectEntries>,
}

export interface Day {
    day: number,
    holiday: boolean,
}

export type DaysOfTheMonth = Array<Day>;
export type Projects = Array<Project>;
export type ProjectEntries = Array<number>;
