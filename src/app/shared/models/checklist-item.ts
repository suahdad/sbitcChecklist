import { EqComponent} from '../models/component'
import { Checklist } from './checklist';

export class ChecklistItem {
    checklist? : Checklist
    checklistid?: number;
    equipment_typeid: string;
    component?: EqComponent
    componentid: string;
    conditionid: string; 
    remarks: string;
}
