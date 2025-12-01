/**
 * @description
 * @export
 */
export type ContextMiddlewareFunction<Context = any> = (context: Context, next: () => void) => void;
