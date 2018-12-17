import { sp } from "@pnp/sp";

import { clearList } from "./clearList";
import { logMessage } from "./logMessage";
import { listPrefix } from "../constants";
import { state } from "../classes/DataCombinerState";

export function createList(): Promise<any> {
    const listName: string = listPrefix + state.selected.label;
    return clearList(listName)
        .then(() => {
            logMessage("creating new list");
            return sp.web.lists.add(listName);
        });
}