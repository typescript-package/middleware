// Abstract.
import { MiddlewareCore } from './middleware-core.abstract';
// Type.
import { MiddlewareFunction } from '@typedly/middleware';
/**
 * @description The base abstraction for arguments middleware.
 * @export
 * @abstract
 * @class MiddlewareBase
 * @typedef {MiddlewareBase}
 * @template [T=any] 
 * @template [O=T[]] 
 * @template {Function} [U=MiddlewareFunction<T>] 
 * @extends {MiddlewareCore<T, O, U>}
 */
export abstract class MiddlewareBase<
  T = any,
  O = T[],
  U extends Function = MiddlewareFunction<T>
> extends MiddlewareCore<T, O, U> {
  /**
   * @description
   * @type {number}
   */
  #index = 0;

  /**
   * @description
   * @type {U[]}
   */
  #middleware: U[];

  /**
   * @description
   * @type {() => void}
   */
  #onComplete: (args: O) => void = () => {};

  /**
   * Creates an instance of `MiddlewareBase`.
   * @constructor
   * @param {...U[]} middleware 
   */
  constructor(...middleware: U[]) {
    super();
    this.#middleware = middleware;
  }

  /**
   * @description
   * @public
   * @param {...T[]} args 
   * @returns {this} 
   */
  public execute(...args: T[]) {
    return this.#index = 0,
      this.#next(...args),
      this;
  }

  /**
   * @description
   * @public
   * @async
   * @param {...T[]} args 
   * @returns {unknown} 
   */
  public override async executeAsync(...args: T[]): Promise<O> {
    return this.#index = 0,
      await this.#nextAsync(...args),
      this.onComplete(() => args as O),
      args as O;
  }

  /**
   * @description
   * @public
   * @param {(args: T[]) => void} onComplete 
   */
  public onComplete(onComplete: (args: O) => void): void {
    this.#onComplete = onComplete;
  }

  /**
   * @description
   * @public
   * @param {U} middleware 
   * @returns {this} 
   */
  public use(middleware: U): this {
    return this.#middleware.push(middleware), this;
  }

  /**
   * @description
   * @param {...T[]} args 
   */
  #next(...args: T[]): void {
    this.#index < this.#middleware.length
      ? this.#middleware[this.#index++](args, () => this.#next(...args))
      : this.#onComplete(args as O);
  }

  /**
   * @description
   * @async
   * @param {...T[]} args  
   * @returns {*} 
   */
  async #nextAsync(...args: T[]): Promise<void> {
    this.#index < this.#middleware.length
      ? await this.#middleware[this.#index++](args, () => this.#nextAsync(...args))
      : this.#onComplete(args as O);
  }
}