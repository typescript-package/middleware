// Abstract.
import { MiddlewareBase } from './middleware-base.abstract';
// Type.
import { ContextMiddlewareFunction } from '../type';
/**
 * @description
 * @export
 * @abstract
 * @class ContextMiddlewareBase
 * @template [T=any] 
 * @template {Function} [U=ContextMiddlewareFunction<T>] 
 * @extends {MiddlewareBase<T, T, U>}
 */
export abstract class ContextMiddlewareBase<
  T = any,
  U extends Function = ContextMiddlewareFunction<T>
> extends MiddlewareBase<T, T, U> {
  /**
   * @description
   * @public
   * @param {T} context 
   */
  public override execute(context: T) {
    return super.execute(context), this;
  }

  /**
   * @description
   * @public
   * @async
   * @param {T} context 
   * @returns {unknown} 
   */
  public override async executeAsync(context: T): Promise<T> {
    return super.executeAsync(context);
  }

  /**
   * @description
   * @public
   * @param {(context: T) => void} onComplete 
   */
  public override onComplete(onComplete: (context: T) => void): void {
    super.onComplete(onComplete);
  }

  /**
   * @description
   * @public
   * @param {U} middleware 
   * @returns {this} 
   */
  public override use(middleware: U): this {
    return super.use(middleware);
  }
}