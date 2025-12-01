import { Middleware } from "../lib";

const middleware = new Middleware();

middleware.use((args, next) => {
  console.log('Middleware 1 executed with args:', args);
  args[0].newKey = 'newValue';
  next();
});


middleware.use((args, next) => {
  console.log('Middleware 2 executed with args:', args);
  next();
});

middleware.execute({ key: 'value' });

// Async
middleware.use(async (args, next) => {
  console.log('Async middleware 1 start with args:', args);
  args[0].newKey = 'newValue';
  await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('Async middleware end');
  next();
});

middleware.use(async (args, next) => {
  console.log('Async middleware 2 start with args:', args);
  next();
});

middleware.onComplete((args) => {
  console.log('All middlewares completed with args:', args);
});

middleware.executeAsync({ key: 'value' });

describe('Middleware', () => {
  it('should be defined', () => {
    expect(Middleware).toBeDefined();
  });

  it('should create an instance', () => {
    expect(middleware).toBeInstanceOf(Middleware);
  });
});
