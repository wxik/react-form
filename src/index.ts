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

export type {
  CCFieldError,
  CCFormData,
  CCFormInstance,
  CCListInstance,
  CCOptions,
  CCRequiredType,
  CCRulesType,
  ICCEmitter,
  ICCFieldOmit as ICCField,
  ICCFieldListener,
  ICCForm,
  ICCList,
  ICCListActionOperation,
  ICCListOperation,
  ICCListView,
  IFieldItem,
} from './interface';

CCForm.List = CCList;
CCForm.ListView = CCListView;
CCForm.Field = CCField;
CCForm.Outlet = CCOutlet;
CCForm.OutletView = CCOutletView;
CCForm.ListAction = CCListAction;

export {CCField, CCForm, CCList, CCListAction, CCListView, CCOutlet, CCOutletView};
