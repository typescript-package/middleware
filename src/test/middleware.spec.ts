import { Middleware } from "../lib";

const middleware = new Middleware();

middleware.use((args, next) => {
  console.log('Middleware executed with args:', args);
  next();
});

middleware.execute({ key: 'value' });

describe('Middleware', () => {
  it('should be defined', () => {
    expect(Middleware).toBeDefined();
  });

  it('should create an instance', () => {
    expect(middleware).toBeInstanceOf(Middleware);
  });
});
