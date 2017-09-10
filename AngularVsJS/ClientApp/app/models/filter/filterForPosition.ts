export interface IFilter {
    value: string;
    title: string;
    checked: boolean;
}

export class FilteringOptions implements IFilter {
    public value: string;
    public title: string;
    public checked: boolean;
    public column: string;
}