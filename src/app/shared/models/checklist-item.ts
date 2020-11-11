import { Component } from '@angular/core';
import { Checklist } from './checklist';

export class ChecklistItem {
    checklist? : Checklist
    checklistid?: number;
    equipment_typeid: string;
    component?: Component
    componentid: string;
    conditionid: string; 
    remarks: string;
}
