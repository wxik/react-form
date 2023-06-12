/**
 *
 * @author wxik
 * @sine 2020-04-14 15:41
 */

import {CCField} from './CCField';
import {CCForm} from './CCForm';
import {CCList} from './CCList';
import {CCOutlet} from './CCOutlet';

export type {CCListOperation} from './CCContext';
export type {CCRequiredType, CCRulesType, ICCFieldOmit as ICCField, ICCFieldListener, IFieldItem} from './CCField';
export type {CCFormData, CCFormInstance, ICCEmitter, ICCForm} from './CCForm';
export type {CCListInstance, ICCList} from './CCList';

CCForm.List = CCList;
CCForm.Field = CCField;
CCForm.Outlet = CCOutlet;
CCForm.OutletView = CCOutlet.View;

export {CCField, CCForm, CCList, CCOutlet};
