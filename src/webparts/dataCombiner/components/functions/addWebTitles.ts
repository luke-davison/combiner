import { ISite } from "../classes/ISite";

// this function will result in multiple API calls for the same web
// = room for efficiency improvements

export function addWebTitles(item: any, site: ISite): Promise<any> {
    const promises: Array<Promise<any>> = [];

    promises.push(site.current.web
        .select("Title")
        .get()
        .then((web: {Title: string}) => {
            item.SiteTitle = web.Title;
        })
        .catch(error => console.log("error getting web title", error))
    );
    promises.push(site.parent.web
        .select("Title")
        .get()
        .then((web: {Title: string}) => {
            item.ParentSite = web.Title;
        })
        .catch(error => console.log("error getting parent title", error))
    );

    return Promise.all(promises);
}