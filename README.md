
<a href="https://www.typescriptlang.org/">
  <img
    src="https://raw.githubusercontent.com/typescript-package/core/refs/heads/main/ts-package-barcode-logo-512.png"
    width="20%"
    title="@typescript-package/middleware - A lightweight TypeScript library for middleware."
  />
</a>

## @typescript-package/middleware

<!-- npm badge -->
[![npm version][typescript-package-npm-badge-svg]][typescript-package-npm-badge]
[![GitHub issues][typescript-package-badge-issues]][typescript-package-issues]
[![GitHub license][typescript-package-badge-license]][typescript-package-license]

A **lightweight** TypeScript library for middleware.

## Table of contents

- [Features](#features)
- [Installation](#installation)
- [Api](#api)
  - Abstract
    - [`ContextMiddlewareBase`](#contextmiddlewarebase)
    - [`MiddlewareBase`](#middlewarebase)
    - [`MiddlewareCore`](#middlewarecore)
  - Class
    - [`ContextMiddleware`](#contextmiddleware)
    - [`Middleware`](#middleware)
- [Contributing](#contributing)
- [Support](#support)
- [Code of Conduct](code-of-conduct)
- [Git](#git)
  - [Commit](#commit)
  - [Versioning](#versioning)
- [License](#license)
- [Related packages](#related-packages)

### Features

- **Core abstraction**: Class for both arguments-based (array) and object-based (context) middleware.
- **Base abstraction**: Extends core abstraction with functionality to build new arguments-based middlewares.
- **Concrete class**: Extension of base for initialization.
- **Context middleware**: Context object-based `ContextMiddleware` base and concrete middleware built on `MiddlewareBase`.

## Installation

### 1. Install the package

```bash
npm install @typescript-package/middleware --save-peer
```

## Api

### `ContextMiddlewareBase`

```typescript
import { ContextMiddlewareBase } from '@typescript-package/middleware';
```

### `MiddlewareCore`

```typescript
import { MiddlewareCore } from '@typescript-package/middleware';
```

### `MiddlewareBase`

```typescript
import { MiddlewareBase } from '@typescript-package/middleware';
```

### `Middleware`

```typescript
import { Middleware } from '@typescript-package/middleware';

// Initialize.
const middleware = new Middleware();

// Add middleware.
middleware.use((args, next) => {
  console.log('Middleware 1 executed with args:', args);

  // Modify args.
  args[0].newKey = 'newValue';

  // Execute next.
  next();
});

middleware.use((args, next) => {
  console.log('Middleware 2 executed with args:', args);

  // Execute next.
  next();
});

// logs
// Middleware 1 executed with args: [ { key: 'value' } ]
// Middleware 2 executed with args: [ { key: 'value', newKey: 'newValue' } ]
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
```

### `ContextMiddleware`

```typescript
import { ContextMiddleware } from '@typescript-package/middleware';

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

```

## Contributing

Your contributions are valued! If you'd like to contribute, please feel free to submit a pull request. Help is always appreciated.

## Support

If you find this package useful and would like to support its and general development, you can contribute through one of the following payment methods. Your support helps maintain the packages and continue adding new.

Support via:

- [Stripe](https://donate.stripe.com/dR614hfDZcJE3wAcMM)
- [Revolut](https://checkout.revolut.com/pay/048b10a3-0e10-42c8-a917-e3e9cb4c8e29)
- [GitHub](https://github.com/sponsors/angular-package/sponsorships?sponsor=sciborrudnicki&tier_id=83618)
- [DonorBox](https://donorbox.org/become-a-sponsor-to-the-angular-package?default_interval=o)
- [Patreon](https://www.patreon.com/checkout/angularpackage?rid=0&fan_landing=true&view_as=public)

or via Trust Wallet

- [XLM](https://link.trustwallet.com/send?coin=148&address=GAFFFB7H3LG42O6JA63FJDRK4PP4JCNEOPHLGLLFH625X2KFYQ4UYVM4)
- [USDT (BEP20)](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94&token_id=0x55d398326f99059fF775485246999027B3197955)
- [ETH](https://link.trustwallet.com/send?coin=60&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)
- [BTC](https://link.trustwallet.com/send?coin=0&address=bc1qnf709336tfl57ta5mfkf4t9fndhx7agxvv9svn)
- [BNB](https://link.trustwallet.com/send?coin=20000714&address=0xA0c22A2bc7E37C1d5992dFDFFeD5E6f9298E1b94)

## Code of Conduct

By participating in this project, you agree to follow **[Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)**.

## GIT

### Commit

Please follow the following commit message conventions:

- [AngularJS Git Commit Message Conventions][git-commit-angular]
- [Karma Git Commit Msg][git-commit-karma]
- [Conventional Commits][git-commit-conventional]

### Versioning

The package follows [Semantic Versioning 2.0.0][git-semver] for all releases. The versioning format is:

**Given a version number MAJOR.MINOR.PATCH, increment the:**

- MAJOR version when you make incompatible API changes,
- MINOR version when you add functionality in a backwards-compatible manner, and
- PATCH version when you make backwards-compatible bug fixes.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

**FAQ**
How should I deal with revisions in the 0.y.z initial development phase?

> The simplest thing to do is start your initial development release at 0.1.0 and then increment the minor version for each subsequent release.

How do I know when to release 1.0.0?

> If your software is being used in production, it should probably already be 1.0.0. If you have a stable API on which users have come to depend, you should be 1.0.0. If you’re worrying a lot about backwards compatibility, you should probably already be 1.0.0.

## License

MIT © typescript-package ([license][typescript-package-license])

## Related packages

- **[@typescript-package/chain-descriptor](https://github.com/typescript-package/chain-descriptor)**: A **TypeScript** library for chain property descriptor.
- **[@typescript-package/controller](https://github.com/typescript-package/controller)**: A **TypeScript** package with for various kind of controllers.
- **[@typescript-package/descriptor](https://github.com/typescript-package/descriptor)**: A **TypeScript** library for property descriptor.
- **[@typescript-package/descriptor-chain](https://github.com/typescript-package/descriptor-chain)**: A **TypeScript** library for property descriptor chain.
- **[@typescript-package/descriptors](https://github.com/typescript-package/descriptors)**: A **TypeScript** library for property descriptors.
- **[@typescript-package/property](https://github.com/typescript-package/property)**: A **TypeScript** package with features to handle object properties.
- **[@typescript-package/wrap-descriptor](https://github.com/typescript-package/wrap-descriptor)**: A **TypeScript** package for wrapping object descriptors.
- **[@typescript-package/wrap-property](https://github.com/typescript-package/wrap-property)**: A **TypeScript** package for wrapping object properties.
- **[@typescript-package/wrapped-descriptor](https://github.com/typescript-package/wrapped-descriptor)**: A **TypeScript** library for wrapped property descriptor.
- **[@xtypescript/property](https://github.com/xtypescript/property)** - A comprehensive, reactive **TypeScript** library for precise and extensible object property control.

<!-- This package: typescript-package  -->
  <!-- GitHub: badges -->
  [typescript-package-badge-issues]: https://img.shields.io/github/issues/typescript-package/middleware
  [isscript-package-badge-forks]: https://img.shields.io/github/forks/typescript-package/middleware
  [typescript-package-badge-stars]: https://img.shields.io/github/stars/typescript-package/middleware
  [typescript-package-badge-license]: https://img.shields.io/github/license/typescript-package/middleware
  <!-- GitHub: badges links -->
  [typescript-package-issues]: https://github.com/typescript-package/middleware/issues
  [typescript-package-forks]: https://github.com/typescript-package/middleware/network
  [typescript-package-license]: https://github.com/typescript-package/middleware/blob/master/LICENSE
  [typescript-package-stars]: https://github.com/typescript-package/middleware/stargazers
<!-- This package -->

<!-- Package: typescript-package -->
  <!-- npm -->
  [typescript-package-npm-badge-svg]: https://badge.fury.io/js/@typescript-package%2Fmiddleware.svg
  [typescript-package-npm-badge]: https://badge.fury.io/js/@typescript-package%2Fmiddleware

<!-- GIT -->
[git-semver]: http://semver.org/

<!-- GIT: commit -->
[git-commit-angular]: https://gist.github.com/stephenparish/9941e89d80e2bc58a153
[git-commit-karma]: http://karma-runner.github.io/0.10/dev/git-commit-msg.html
[git-commit-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
