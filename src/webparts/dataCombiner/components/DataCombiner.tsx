import { observer } from "mobx-react";
import * as React from "react";
import Select from "react-select";

import styles from "./DataCombiner.module.scss";

import { state } from "./classes/DataCombinerState";
import { IList } from "./classes/IList";
import { getListNames } from "./functions/getListNames";
import { createList } from "./functions/createList";
import { getAllListItems } from "./functions/getAllListItems";
import { addCreatedDetails } from "./functions/addCreatedDetails";
import { addColumns } from "./functions/addColumns";
import { listPrefix } from "./constants";
import { addItems } from "./functions/addItems";
import { logMessage } from "./functions/logMessage";

@observer
export default class DataCombiner extends React.Component<{}, {}> {

  public componentDidMount(): void {
    getListNames()
      .then(() => state.loading = false);
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