import { IWeb } from "./IWeb";

export interface ISite {
    parent: IWeb;
    current: IWeb;
}