import { sp, Web } from "@pnp/sp";

import { getChildWebs } from "./getChildWebs";
import { getListNamesFromWeb } from "./getListsNamesFromWeb";

export function getListNames(parentWeb?: Web): Promise<any> {
    if (!parentWeb) {
        parentWeb = sp.web;
    }

    return getChildWebs(parentWeb).then((webs: Web[]) => {
        const promises: Array<Promise<any>> = [];
        webs.forEach(web => promises.push(getListNamesFromWeb(web, parentWeb, 0)));
        return Promise.all(promises);
    });
  }