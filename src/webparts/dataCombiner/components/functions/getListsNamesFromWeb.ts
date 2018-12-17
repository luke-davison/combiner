import { Web } from "@pnp/sp";

import { state } from "../classes/DataCombinerState";
import { getChildWebs } from "./getChildWebs";

export function getListNamesFromWeb(web: Web, parentWeb: Web, subsite?: number): Promise<any> {
    return web.lists
        .filter("Hidden eq false and ItemCount gt 0")
        .select("Title")
        .get()
        .then((lists: Array<{Title: string}>) => {
            lists.forEach((list) => {
                const label: string = subsite ? `Subsite ${subsite} ${list.Title}` : list.Title;
                for (let i: number = 0; i < state.lists.length; i++) {
                    if (state.lists[i].label === label) {
                        return state.lists[i].sites.push({parent: {web: parentWeb}, current: {web}});
                    }
                }
                state.lists.push({
                    title: list.Title,
                    label, value: state.lists.length,
                    sites: [{parent: {web: parentWeb}, current: {web}}]
                });
            });

            return getChildWebs(parentWeb).then((webs: Web[]) => {
                const promises: Array<Promise<any>> = [];
                webs.forEach((newWeb) => promises.push(getListNamesFromWeb(newWeb, web, subsite + 1)));
                return Promise.all(promises);
            });
        });
}