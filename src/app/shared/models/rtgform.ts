import { Breakdown } from './breakdown';
import { Remark } from './remark';

export class RTGForm {
    id: number;
    equipmentId: string;
    datecreated: Date;
    datemodified: Date;
    createdbyid: string;
    modifiedbyid: string;

    breakdowns: Breakdown[]
    remarks: Remark[]
    
}
