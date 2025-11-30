// Interface.
import { MiddlewareShape } from "../interface/middleware.shape";
/**
 * @description
 * @export
 * @abstract
 * @class MiddlewareCore
 * @typedef {MiddlewareCore}
 * @template [Input=any] 
 * @template [Output=void] 
 * @template [Middleware=any] 
 * @implements {MiddlewareShape<Input, Middleware>}
 */
export abstract class MiddlewareCore<
  Input = any,
  Output = void,
  Middleware = any
> implements MiddlewareShape<Input, Output, Middleware> {
  /**
   * @description
   * @public
   * @abstract
   * @param {...Input[]} args 
   */
  public abstract execute(context: Input): this;
  public abstract execute(...args: Input[]): this;

  /**
   * @description
   * @public
   * @abstract
   * @param {Middleware} middleware 
   * @returns {this} 
   */
  public abstract use(middleware: Middleware): this;

  public abstract executeAsync(context: Input): Promise<Output>;
  public abstract executeAsync(...args: Input[]): Promise<Output>;
}
