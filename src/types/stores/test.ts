export interface UseTestState {
    bears: number;
    increasePopulation: () => void;
    removeAllBears: () => void;
    updateBears: (bear:number) => void;
}