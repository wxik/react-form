/**
 *
 * @author wxik
 * @sine 2020-04-14 15:41
 */

import {CCField} from './CCField';
import {CCForm} from './CCForm';
import {CCList} from './CCList';
import {CCListAction} from './CCListAction';
import {CCListView} from './CCListView';
import {CCOutlet, CCOutletView} from './CCOutlet';

export type {CCRequiredType, CCRulesType, ICCFieldOmit as ICCField, ICCFieldListener, IFieldItem} from './CCField';
export type {CCFormData, CCFormInstance, ICCEmitter, ICCForm} from './CCForm';
export type {CCListInstance, ICCList} from './CCList';

CCForm.List = CCList;
CCForm.ListView = CCListView;
CCForm.Field = CCField;
CCForm.Outlet = CCOutlet;
CCForm.OutletView = CCOutletView;
CCForm.ListAction = CCListAction;

export {CCField, CCForm, CCList, CCListAction, CCListView, CCOutlet, CCOutletView};
