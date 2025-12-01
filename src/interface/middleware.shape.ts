/**
 * @description The shape of a middleware system.
 * @export
 * @interface MiddlewareShape
 * @typedef {MiddlewareShape}
 * @template [Input=any] The type of the arguments passed to middleware functions.
 * @template [Output=any] The type of the output returned by middleware functions.
 * @template [Middleware=any] The type of the middleware.
 */
export interface MiddlewareShape<Input = any, Output = any, Middleware = any> {
  execute(context: Input): void;
  execute(...args: Input[]): void;
  use(middleware: Middleware): this;
  executeAsync(context: Input): Promise<Output>;
  executeAsync(...args: Input[]): Promise<Output>;
}
