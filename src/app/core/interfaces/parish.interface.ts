import { ParishEnum } from "./parish.enum";

export interface ParishI {
    readonly [ParishEnum.ID]: string;
    readonly [ParishEnum.NAME]: string;
    readonly [ParishEnum.ADDRESS]: string;
    readonly [ParishEnum.LOCATION]: string;
}