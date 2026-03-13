/**
 *
 * @author zehua.tang
 * @sine 2020-04-14 15:41
 */

import { CCField } from './CCField';
import { CCForm } from './CCForm';
import { CCList } from './CCList';
import { CCListAction } from './CCListAction';
import { CCListView } from './CCListView';
import { CCOutlet, CCOutletView } from './CCOutlet';

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

export * from './helper/Types';
export * from './helper/Tools';
export * from './helper/Observer';

export {
  CCForm,
  CCList,
  CCField,
  CCOutlet,
  /**
   * @use CCList.View
   * @deprecated
   */
  CCListView,
  /**
   * @use CCList.Action
   * @deprecated
   */
  CCListAction,
  /**
   * @use CCOutlet.View
   * @deprecated
   */
  CCOutletView,
};
