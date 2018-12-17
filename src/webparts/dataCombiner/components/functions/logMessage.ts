import { state } from "../classes/DataCombinerState";

export function logMessage(message: string): void {
    state.messages.push(message);
}