import { Middleware } from "../lib";

const middleware = new Middleware();

middleware.use((args, next) => {
  console.log('Middleware executed with args:', args);
  next();
});


middleware.use((args, next) => {
  console.log('Middleware executed with args:', args);
  args[0].newKey = 'newValue';
  next();
});

middleware.execute({ key: 'value' });

middleware.use(async (args, next) => {
  console.log('Async middleware start with args:', args);
  // await new Promise(resolve => setTimeout(resolve, 2000));
  console.log('Async middleware end');
  next();
});

middleware.onComplete((args) => {
  console.log('All middleware completed with args:', args);
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
