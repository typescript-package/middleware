import { Middleware } from "../lib";

// <{ key: string; newKey?: string }>
const middleware = new Middleware(
  (args: ({ key: string; newKey?: string })[], next: () => void) => {
    console.log('Middleware 0 executed with args:', args);
    next();
  },
  (args: { key: string; anyKey?: string }[], next: () => void) => {
    console.log('Middleware 00 executed with args:', args);
    next();
  }
);

middleware.use(([args], next) => {
  console.log('Middleware 1 executed with args:', args);
  args.newKey = 'newValue';
  next();
});


middleware.use((args, next) => {
  console.log('Middleware 2 executed with args:', args);
  next();
});

middleware.execute({ key: 'value' }, 2);

// Async
middleware.use(async ([args], next) => {
  console.log('Async middleware 1 start with args:', args);
  args.newKey = 'newValue';
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
