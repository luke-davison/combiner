import { logMessage } from "./logMessage";
import { sp } from "@pnp/sp";


export function addCreatedDetails(items: Array<any>): Promise<any> {

    items.forEach(item => item.CreatedDate = item.Created);

    logMessage("getting user display names");

    const uniqueUserIds: number[] = items.reduce((users: number[], item) => {
      if (users.indexOf(item.AuthorId) === -1) {
        users.push(item.AuthorId);
      }
      return users;
    }, []);

    const promises: Array<Promise<any>> = [];
    uniqueUserIds.forEach(id => {
      promises.push(sp.web.getUserById(id).get().then(result => items
            .filter(item => item.AuthorId === id)
            .forEach(item => item.CreatedBy = result.Title)
      ));
    });
    return Promise.all(promises);
}

