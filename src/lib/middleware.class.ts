// Abstract.
import { MiddlewareBase } from './middleware-base.abstract';
// Type.
import { MiddlewareFunction } from '../type';
/**
 * @description
 * @export
 * @class Middleware
 * @typedef {Middleware}
 * @template [T=any] 
 * @template {Function} [U=MiddlewareFunction<T>] 
 * @extends {MiddlewareBase<T, T[], U>}
 */
export class Middleware<
  T = any,
  U extends Function = MiddlewareFunction<T>
> extends MiddlewareBase<T, T[], U> {}