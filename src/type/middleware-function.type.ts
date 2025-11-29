/**
 * @description
 * @export
 */
export type MiddlewareFunction = (args: any[], next: () => void) => void;
