import { EqComponent} from '../models/component'
import { Checklist } from './checklist';
import { Question } from './question';

export class ChecklistItem {
    checklist? : Checklist
    checklistID?: number;
    equipment_TypeID: string;
    component?: EqComponent
    componentid: string;
    conditionid: string; 
    remarks: string;
    question?: Question;
}
