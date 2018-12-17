import { sp } from "@pnp/sp";
import { logMessage } from "./logMessage";
import { columnPrefix } from "../constants";
import { delay } from "./delay";
import { identifyColumns } from "./identifyColumns";

export function addColumns(listName: string, items: Array<any>): Promise<Array<any>> {
    return sp.web.lists
        .getByTitle(listName)
        .items
        .add({Title: "dummy list item"})
        .then(result => {
            const columns: string[] = identifyColumns(items, result.data);
            logMessage("adding columns - this will take around " + columns.length + " seconds");
            const promises: Array<Promise<any>> = [];
            columns.forEach((column, i) => {
                // sharepoint was giving various 500 errors when too many field add requests were sent through at once
                // delay function added to send one request every second
                // it still has the occasional problem
                promises.push(delay(i * 1000).then(() => {
                    return sp.web.lists.getByTitle(listName).fields.addText(columnPrefix + column, 255)
                        .catch(error => {
                            logMessage("an error occurred - please refresh the page and try again");
                            console.log(error);
                        });
                }));
            });
            return Promise.all(promises).then(() => {
                return sp.web.lists.getByTitle(listName).items.getById(result.data.Id)
                    .delete()
                    .then(() => columns);
            });
    });
}