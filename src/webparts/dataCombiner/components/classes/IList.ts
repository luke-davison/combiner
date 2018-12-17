import { ISite } from "./ISite";

export interface IList {
    value: number;
    label: string;
    sites: ISite[];
    title: string;
}