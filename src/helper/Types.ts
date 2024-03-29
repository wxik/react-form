/**
 * Types Check
 * @author Quia
 * @since 2019-06-04 11:10
 */

const toString = Object.prototype.toString;

/**
 * Check the obj whether is function or not
 * @param {*} type
 * @returns {boolean}
 */
export function isFunction<T extends Function>(type: any): type is T {
  return typeof type === 'function';
}

/**
 * Check the obj whether is number or not
 * @param {*} type
 * @returns {boolean}
 */
export function isNumber(type: any): type is number {
  return typeof type === 'number' || toString.call(type) === '[object Number]';
}

/**
 * Check the obj whether is string or not
 * @param {*} type
 * @returns {boolean}
 */
export function isString(type: any): type is string {
  return typeof type === 'string' || toString.call(type) === '[object String]';
}

/**
 * Check the obj whether is boolean or not
 * @param type
 * @returns {boolean}
 */
export function isBoolean(type: any): type is boolean {
  return typeof type === 'boolean' || toString.call(type) === '[object Boolean]';
}

/**
 * Check the type whether is object or not
 * @param {*} type
 * @returns {boolean}
 */
export function isObject<T = Record<any, any>>(type: any): type is T {
  const Ctor = type && type.constructor;
  return (
    typeof type === 'object' &&
    toString.call(type) === '[object Object]' &&
    (!isFunction(Ctor) || (isFunction(Ctor) && Ctor instanceof Ctor && toString.call(Ctor) === '[object Function]'))
  );
}

/**
 * Check the type whether is promise or not
 * @param {*} type
 * @returns {boolean}
 */
export function isPromise<T extends any>(type: any): type is Promise<T> {
  return typeof type === 'object' && (toString.call(type) === '[object Promise]' || Promise.resolve(type) === type);
}

/**
 * Check the type whether is array or not
 * @param {*} type
 * @returns {boolean}
 */
export function isArray(type: any): type is any[] {
  return Array.isArray(type);
}

/**
 * Check the obj whether is undefined or not
 * @param {*} type
 * @returns {boolean}
 */
export function isUndefined(type: any): type is undefined {
  return typeof type === 'undefined';
}

/**
 * Check the obj whether is null or not
 * @param type
 * @returns {boolean}
 */
export function isNull(type: any): type is null {
  return type === null;
}

/**
 * Check the value whether is empty
 * @param {*} value
 * @returns {boolean}
 */
export function isEmpty(value: any): value is null | undefined {
  return isUndefined(value) || isNull(value);
}

/**
 * Check the value whether is blank
 * @param {any} [value]
 * @returns {boolean}
 */
export function isBlank(value?: any): value is null | undefined {
  return isEmpty(value) || !String(value).trim().length;
}

/**
 * Check the obj whether is empty object
 * @param {object} value
 * @returns {boolean}
 */
export function isEmptyObject(value: object): boolean {
  return isEmpty(value) || !isObject(value) || !Object.getOwnPropertyNames(value).length;
}

/**
 * Check the obj whether is empty Array
 * @param {Array<*>} value
 * @returns {boolean}
 */
export function isEmptyArray(value: Array<any> | null): value is null | [] {
  return isEmpty(value) || !isArray(value) || !value.length;
}
