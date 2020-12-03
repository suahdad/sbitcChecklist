import { Equipment } from './equipment';
import { User } from './user';
import { ChecklistItem } from './checklist-item';

export class Checklist {
    id?: number;
    equipmentID: string;
    date_Created?: Date;
    user? : User
    userID: string;

    checklist_items:  ChecklistItem[];
}
