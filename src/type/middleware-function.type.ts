/**
 * @description
 * @export
 */
export type MiddlewareFunction<Args = any> = (args: Args[], next: () => void) => void;
