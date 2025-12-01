// Abstract.
import { ContextMiddlewareBase } from './context-middleware-base.abstract';
// Type.
import { ContextMiddlewareFunction } from '../type';
/**
 * @description
 * @export
 * @class ContextMiddleware
 * @template [T=any] 
 * @template {Function} [U=ContextMiddlewareFunction<T>] 
 * @extends {ContextMiddlewareBase<T, U>}
 */
export class ContextMiddleware<
  T = any,
  U extends Function = ContextMiddlewareFunction<T>
> extends ContextMiddlewareBase<T, U> {}