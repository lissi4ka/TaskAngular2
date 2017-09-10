import {PositionType} from "./enums/positionType";
import { PositionStatus } from "./enums/positionStatus";

export interface IPosition {
    id: string;
    type: PositionType;
    name: string;
    date: Date;
    description?: string;
    status: PositionStatus;
}

export class PositionItem implements IPosition {
    public id: string;
    public type: PositionType;
    public name: string;
    public date: Date;
    public description?: string;
    public status: PositionStatus;
}


