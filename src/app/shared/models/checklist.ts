import { Equipment } from './equipment';
import { User } from './user';
import { ChecklistItem } from './checklist-item';

export class Checklist {
    id?: number;
    equipmentid: string;
    date_created: Date;
    userid: string;

    checklist_items:  ChecklistItem[];
}
