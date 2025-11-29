// Type.
import { MiddlewareFunction } from '../type';
/**
 * @description
 * @export
 * @class Middleware
 * @template [T=any] 
 */
export class Middleware<T = any> {
  /**
   * @description
   * @type {number}
   */
  #index = 0;

  /**
   * @description
   * @type {MiddlewareFunction[]}
   */
  #middleware: MiddlewareFunction[];

  /**
   * @description
   * @type {() => void}
   */
  #onComplete: () => void = () => {};

  /**
   * Creates an instance of `ListenersMiddleware`.
   * @constructor
   * @param {...MiddlewareFunction[]} middleware 
   */
  constructor(...middleware: MiddlewareFunction[]) {
    this.#middleware = middleware;
  }

  /**
   * @description
   * @public
   * @param {...T[]} args 
   */
  public execute(...args: T[]) {
    this.#index = 0;
    this.#next(...args);
  }

  /**
   * @description
   * @public
   * @async
   * @param {...T[]} args 
   * @returns {unknown} 
   */
  public async executeAsync(...args: T[]) {
    this.#index = 0;
    return new Promise<void>(async resolve => (
      await this.#nextAsync(...args),
      this.onComplete(resolve)
    ));
  }

  /**
   * @description
   * @public
   * @param {() => void} onComplete 
   */
  public onComplete(onComplete: () => void): void {
    this.#onComplete = onComplete;
  }

  /**
   * @description
   * @public
   * @param {MiddlewareFunction} middleware 
   * @returns {this} 
   */
  public use(middleware: MiddlewareFunction): this {
    return this.#middleware.push(middleware), this;
  }

  /**
   * @description
   * @param {...T[]} args 
   */
  #next(...args: T[]) {
    this.#index < this.#middleware.length
      ? this.#middleware[this.#index++](args, () => this.#next(...args))
      : this.#onComplete();
  }

  /**
   * @description
   * @async
   * @param {...T[]} args  
   * @returns {*} 
   */
  async #nextAsync(...args: T[]) {
    this.#index < this.#middleware.length
      ? await this.#middleware[this.#index++](args, () => this.#nextAsync(...args))
      : this.#onComplete();
  }
}