export type GenericCallback = (() => void) | undefined;

export const Duplicate2DArray = <T>(array: Array<Array<T>>) => {
    return [...array.map((item) => [...item])];
}

export const CopyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
}

export const FixedPointRound = (points: number, n: number) => {
    const mult = Math.pow(10, points);
    return Math.round(n * mult) / mult;
}

export const Random = (min: number, max: number, step: number): number => {
    // Ensure the range is valid
    if (min >= max) {
        throw new Error("Minimum value must be less than the maximum value.");
    }

    // Calculate the number of steps in the range
    const steps = Math.floor((max - min) / step);

    // Generate a random step index
    const randStep = Math.floor(Math.random() * (steps + 1));

    // Calculate the random value by multiplying the step size with the random step index
    const randValue = min + randStep * step;

    // Ensure the random value is within range
    return Math.min(randValue, max);
}

export const sleep = async (time: number) => {
    await new Promise<void>(res => {
        setTimeout(() => res(), time)
    });
}