import { ContextMiddleware } from "../lib";

const contextMiddleware = new ContextMiddleware<{ req: string; res?: string }>(
  (context, next: () => void) => {
    console.log('Middleware 0 executed with args:', context);
    next();
  },
  (context, next: () => void) => {
    console.log('Middleware 00 executed with args:', context);
    next();
  }
);

contextMiddleware.use((context, next) => {
  console.log('Middleware 1 executed with args:', context);
  context.req = 'newValue';
  next();
});


contextMiddleware.use((context, next) => {
  console.log('Middleware 2 executed with args:', context);
  next();
});

contextMiddleware.execute({ req: 'value' });

// Async
contextMiddleware.use(async (context, next) => {
  console.log('Async middleware 1 start with args:', context);
  context.req = 'newValue';
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('Async middleware end');
  next();
});

contextMiddleware.use(async (args, next) => {
  console.log('Async middleware 2 start with args:', args);
  next();
});

contextMiddleware.onComplete((args) => {
  console.log('All middlewares completed with args:', args);
});

contextMiddleware.executeAsync({ req: 'value' });
