/**
 *
 * @author Quia (zehua.tang)
 * @since 2023-02-27 11:12
 */

import {isObservable} from './Observer';
import * as Types from './Types';

function getAKeysToObjc(key: string, obj: Record<string, any>) {
  let index = 0;
  return key.indexOf('[') !== -1
    ? key.replace(/(\w)\[+([\w.\s]*)]+/g, function ($a, $b, $c) {
        let vk = `[${$c.replace(/\./g, '_')}_${++index}]`;
        if ($c.indexOf('.') !== -1) {
          obj[vk] = $c;
          return `${$b}.${vk}`;
        } else {
          return `${$b}.${$c}`;
        }
      })
    : key;
}

/**
 * 获取对象值
 * item = {a: {b: {c: 'c', c1: 'c1'}, b1: [1, 2, 3]}, a1: 'a1'}
 * getItemValue(object, 'a.b.c') === 'c'
 * getItemValue(object, 'a.e.e', 'default') === 'default'
 * getItemValue(object, 'a.b1.1') === 2 //也可以取数组
 * @param {Object|Array} item
 * @param {String} key
 * @param {*} [defaultValue]
 * @returns {*}
 */
export function getItemValue(item: Record<string, any>, key: string, defaultValue?: any) {
  if (Types.isEmpty(item) || Types.isBlank(key)) return defaultValue;

  if (Types.isObject(item) || Types.isArray(item)) {
    let value = item,
      ks: Record<string, any> = {};
    if (key in item) {
      value = item[key];
    } else {
      let bit = getAKeysToObjc(key, ks).split('.');
      for (let vk of bit) {
        value = vk in ks ? value[ks[vk]] : value[vk];
        if (!value) break;
      }
    }
    return Types.isEmpty(value) ? defaultValue : value;
  } else {
    return item;
  }
}

/**
 * 获取对象值
 * item = {a: {b: {c: 'c', c1: 'c1'}, b1: [1, 2, 3]}, a1: 'a1'}
 * getItemValue(object, 'a.b.c') === 'c'
 * getItemValue(object, 'a.e.e', 'default') === 'default'
 * getItemValue(object, 'a.b1.1') === 2 //也可以取数组
 * @param {Object|Array} item
 * @param {String|Number} [key]
 * @param {*} [defaultValue]
 * @returns {*}
 */
export function get(item: Record<string, any>, key: string | number | undefined, defaultValue?: any) {
  if (Types.isEmpty(item) || Types.isBlank(key)) return defaultValue;

  if (Types.isObject(item) || Types.isArray(item)) {
    let value = item,
      ks: Record<string, any> = {};
    if (key in item) {
      value = item[key];
    } else {
      let bit = getAKeysToObjc(String(key), ks).split('.');
      for (let i = 0, j = bit.length; i < j; i++) {
        let vk = bit[i];
        if (Types.isObject(value) || Types.isArray(value)) {
          let ck = bit.slice(i).join('.');
          if (ck in value) {
            value = ck in ks ? value[ks[ck]] : value[ck];
            break;
          }
        }
        value = vk in ks ? value[ks[vk]] : value[vk];
        if (!value) break;
      }
    }
    return Types.isUndefined(value) ? defaultValue : value;
  } else {
    return item;
  }
}

/**
 * 提取/封装指定字段的对象数据
 * form 表单需要的名称字段, [a, (b.0, b.1 => []), (c.a, c.b => {a, b}), (e.a@1, e.a@2 = e.a), (d.0.a, d.0.b => [{a, b}] ）]
 * field 取值字段, 或者方法返回值
 * inline 是否内联Object, 默认true
 * @param {Object} $data {a: {a1: 2, a2: 3}, b: [{b1: 1, b2: 2}]}
 * @param {Array<{[string]: {form: string, transform: string | Function, inline?: boolean}}>} config
 * @returns {Object}
 */
export function extractData(
  $data: Record<string, any>,
  config: {form: string; transform: string | Function; inline?: boolean}[],
) {
  let newData = Object.create(null);
  (config || []).forEach(({form, transform, inline = true}) => {
    let data: any = normalObservable($data[form]);

    if (Types.isFunction(transform)) {
      // field 如果是方法
      data = Types.isArray(data) ? data.map((da, index) => transform(da, $data, index)) : transform(data, $data);
    } else if (!Types.isBlank(transform)) {
      data = Types.isArray(data) ? data.map((da) => getItemValue(da, transform)) : getItemValue(data, transform);
    }

    // 处理重复字段名称: (a.b@1, a.b@2) => a.b
    form = form.replace(/@\w*/g, '');
    // 内挂 object
    if (inline) {
      // product.list.name = {lcName, lcEnName} => {product: list: {name: {lcName, lcEnName}}}
      // product.0.name = {lcName, lcEnName} => {product: [{name: {lcName, lcEnName}}]}
      parseFieldData(newData, form, data);
    } else {
      // product.list.name = {lcName, lcEnName} => {product: list: {lcName, lcEnName}}
      // product.0.name = {lcName, lcEnName} => {product: [{lcName, lcEnName}]}
      let index = form.lastIndexOf('.');
      if (index !== -1) {
        let start_field = form.substr(0, index),
          end_field = form.substr(index + 1);

        let origin = getItemValue(newData, start_field);
        data = Types.isObject(data) ? data : {[end_field]: data};

        if (Types.isArray(origin)) {
          data = origin.push(data);
        } else if (Types.isObject(origin)) {
          data = Object.assign(origin, data);
        }

        parseFieldData(newData, start_field, data);
      } else {
        // form 不包含多层次结构(不包含: product.list)
        if (Types.isObject(data)) {
          Object.assign(newData, data);
        } else {
          newData[form] = data;
        }
      }
    }
  });

  const keys = Object.keys(newData);
  if (keys.every((da) => /^([1-9]\d*|0)$/.test(da))) {
    newData.length = keys.length;
    newData = Array.from(newData).filter((it) => !Types.isEmpty(it));
  }
  return newData;
}

/**
 * 处理字段回填到数据,
 * a.b.c => {a:{b: {c: 值}}}
 * a.0.c.0 => {a: [{c: [值]}]}
 * @param {Object|Array} obj 填充数据对象
 * @param {String} field 字段标识: a.b.c 或 0.b.c 或 a.0.b.0.c
 * @param { * } value 值
 * @param {Object} options
 * @returns {Object|Array}
 */
export function parseFieldData(obj: Record<string, any>, field: string, value: any, options: Record<string, any> = {}) {
  let {ks = {}} = options;
  let ock = getAKeysToObjc(field, ks);
  let oix = ock.indexOf('.');
  if (~oix) {
    let names = ock.split('.'),
      name = names[0],
      nextNames = names.slice(1).join('.'),
      def = obj[name] || (nextNames[0] === '0' ? [] : Object.create(null));
    let nDef = parseFieldData(def, nextNames, value, {ks, ...options});
    // if (def !== obj[name] && (!Types.isArray(obj) || !Types.isEmpty(value))) {
    if (def !== obj[name]) {
      obj[name in ks ? ks[name] : name] = nDef;
    }
  } else if (!Types.isArray(obj) || !Types.isEmpty(value)) {
    obj[field in ks ? ks[field] : field] = value;
  }
  return obj;
}

/**
 * 转换 Proxy 对象为普通对象
 * @param {any} value
 */
export function normalObservable(value: any) {
  return isObservable(value) ? (Types.isArray(value) ? Array.from(value) : Object.assign({}, value)) : value;
}

export function getValueFromEvent(valuePropName: string, event: any) {
  if (event && event.target && typeof event.target === 'object' && valuePropName in event.target) {
    return (event.target as HTMLInputElement)[valuePropName as keyof HTMLInputElement];
  }
  return event;
}
