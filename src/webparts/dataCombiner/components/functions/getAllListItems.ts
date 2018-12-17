import { ISite } from "../classes/ISite";
import { state } from "../classes/DataCombinerState";
import { addWebTitles } from "./addWebTitles";

export function getAllListItems(): Promise<any[]> {
    const listItems: any[] = [];
    const sites: ISite[] = state.selected.sites;
    const promises: Array<Promise<any>> = [];
    sites.forEach((site) => {
    	promises.push(site.current.web.lists
			.getByTitle(state.selected.title)
			.items
			.get()
			.then(items => {
                items.forEach(item => {
                    listItems.push(item);
                    promises.push(addWebTitles(item, site));
                });
            })
		);
    });
    return Promise.all(promises).then(() => listItems);
}