
export interface TabEntry {
    name: string,
    balance: number;
}

/**
 * The entire timesheet object.
 */
export interface Tab {
    entries: Array<TabEntry>,
}