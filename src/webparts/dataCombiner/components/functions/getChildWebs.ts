import { Web } from "@pnp/sp";

export function getChildWebs(web?: Web): Promise<Web[]> {
    return web.webs
      .select("Title", "Url")
      .get()
      .then((webs: Array<{Title: string, Url: string}>) => webs.map(web2 => new Web(web2.Url)))
      .catch((error) => {
        console.log("error getting child webs", error);
        return [];
      });
  }