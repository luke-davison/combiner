import { sp } from "@pnp/sp";

import { logMessage } from "./logMessage";

export function clearList(listName: string): Promise<any> {
    logMessage("deleting existing list");
    return sp.web.lists
        .getByTitle(listName)
        .delete()
        .catch(error => console.log("error creating new web", error));
}