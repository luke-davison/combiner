import { sp } from "@pnp/sp";

import { logMessage } from "./logMessage";
import { columnPrefix } from "../constants";

export function addItems(listName: string, columns: string[], items: Array<any>): Promise<Array<any>> {
    logMessage("adding " + items.length + " items.  This can take a while if there are a lot of items.");

    const promises: Array<Promise<any>> = [];
    items.forEach(listItem => {
        const itemProperties: any = {Title: listItem.Title};
        columns.forEach(column => {
            if (listItem[column]) {
                itemProperties[columnPrefix + column] = listItem[column].toString();
                if (itemProperties[columnPrefix + column].length > 255) {
                    itemProperties[columnPrefix + column] = itemProperties[columnPrefix + column].slice(0, 255);
                }
            }
        });
    promises.push(sp.web.lists.getByTitle(listName).items.add(itemProperties)
        .catch(error => console.log("error adding new item", error))
        );
    });
    return Promise.all(promises);
}