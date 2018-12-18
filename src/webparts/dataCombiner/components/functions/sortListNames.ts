import { state } from "../classes/DataCombinerState";

export function sortListNames(): void {
    state.lists2 = state.lists2.reduce((arr, x) => {
        let i: number = 0;
        while (i < arr.length && arr[i].label < x.label) {
            i++;
        }
        arr.splice(i, 0, x);
        return arr;
    }, []);
}