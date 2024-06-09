import { PriestEnum } from "./priest.enum";

export interface PriestI {
    readonly [PriestEnum.ID]: string;
    readonly [PriestEnum.NAME]: string;
    readonly [PriestEnum.AGE]: number;
    readonly [PriestEnum.ORDINATION]: string;
    readonly [PriestEnum.HASPARISH]: boolean;
    readonly [PriestEnum.IDPARISH]: string;
}
