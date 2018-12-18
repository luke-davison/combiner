import { observer } from "mobx-react";
import * as React from "react";
import Select from "react-select";

import styles from "./DataCombiner.module.scss";

import { state } from "./classes/DataCombinerState";
import { IList } from "./classes/IList";
import { listPrefix } from "./constants";
import { addItems } from "./functions/addItems";
import { addColumns } from "./functions/addColumns";
import { addCreatedDetails } from "./functions/addCreatedDetails";
import { createList } from "./functions/createList";
import { getAllListItems } from "./functions/getAllListItems";
import { getListNames } from "./functions/getListNames";
import { logMessage } from "./functions/logMessage";
import { sortListNames } from "./functions/sortListNames";

@observer
export default class DataCombiner extends React.Component<{}, {}> {

  public componentDidMount(): void {
    getListNames()
      .then(() => {
        sortListNames();
        state.loading = false;
        state.lists = state.lists2;
      })
      .catch((error) => console.log("uncaught error", error));
  }

  public render(): React.ReactElement<{}> {
    return (
      <div className={ styles.dataCombiner }>
        {!state.loading ? (
          <div>
            <Select
              value={state.selected ? state.selected : null}
              onChange={this.select.bind(this)}
              options={state.lists}
            />
            {state.selected ? (
              <div className={ styles.button } onClick={ this.combineData.bind(this) }>
              <div className={ styles.label }>
                Combine Data
              </div>
            </div>
            ): <div/>}
          </div>
        ) : <div>Loading</div>}
        {state.messages.length ? state.messages.map(message => (
          <div>{message}</div>
        )) : <div/>}
      </div>
    );
  }

  public select(selected: IList): void {
    state.selected = selected;
  }

  private combineData(): void {
    const listName: string = listPrefix + state.selected.label;
    let items: Array<any> = [];
    getAllListItems()
      .then(listItems => { items = listItems; return addCreatedDetails(items); })
      .then(() => createList(listName))
      .then(() => addColumns(listName, items))
      .then(columns => addItems(listName, columns, items))
      .then(() => logMessage("Done"))
      .catch(error => {
        logMessage("An error occurred.  Check the console for further info");
        console.log(error);
      });
  }
}