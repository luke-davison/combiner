import { observable } from "mobx";

import { IList } from "./IList";

export class DataCombinerState {
    @observable public lists: IList[] = [];
    @observable public loading: boolean = true;
    @observable public messages: string[] = [];
    @observable public selected?: IList;
}

export const state: DataCombinerState = new DataCombinerState();