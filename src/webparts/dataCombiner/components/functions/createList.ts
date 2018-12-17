import { sp } from "@pnp/sp";

import { clearList } from "./clearList";
import { logMessage } from "./logMessage";

export function createList(listName: string): Promise<any> {
    return clearList(listName)
        .then(() => {
            logMessage("creating new list");
            return sp.web.lists.add(listName);
        });
}