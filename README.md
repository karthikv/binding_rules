# Binding rules
[![Linux build status][semaphore-img]][semaphore-url]

This package provides two custom tslint rules to control binding functions:
`no-unbound-method-decorator` and `no-arrow-class-property`, as described
further below.

## Installation
Install with npm:

```bash
$ npm install -D binding_rules
```

Register the rules in your `tslint.json`:

```js
// tslint.json
{
  "rulesDirectory": ["node_modules/binding_rules/dist"],
  "rules": {
    // ...
  }
}
```

## `no-unbound-method-decorator`
This is the same as the [core `no-unbound-method` rule][no-unbound-method] rule,
but also supports an option `decorator` to specify an the name of a decorator
that binds a function (e.g. the `boundMethod` decorator from
[autobind-decorator][autobind-decorator]). If a method is decorated with this
decorator, it won't be considered unbound.

```js
// tslint.json
{
  "rulesDirectory": ["node_modules/binding_rules/dist"],
  "rules": {
    "no-unbound-method-decorator": [true, { "decorator": "boundMethod" }]
  }
}
```

```jsx
import { boundMethod } from "autobind-decorator"

class Foo extends React.Component {
  nonDecorated() {}

  @boundMethod
  decorated() {}

  render() {
    return (
      <div>
        {/* bad */}
        <button onClick={this.nonDecorated}>Non-decorated</button>

        {/* good because of the decorator */}
        <button onClick={this.decorated}>Decorated</button>
      </div>
    )
  }
}
```

## `no-arrow-class-property`
Enforces that there are no arrow function class properties. In conjunction with
the `no-unbound-method-decorator` rule, this can be used to enforce that every
method that needs to be bound is done so using a decorator and not an arrow
function.

A decorator-bound method provides a few benefits over an arrow function class
property: it can be called with `super`, it has a non-empty `name` property that
contains the function's name, and it is lazily bound (assuming you're using
[autobind-decorator][autobind-decorator]).

```js
// tslint.json
{
  "rulesDirectory": ["node_modules/binding_rules/dist"],
  "rules": {
    "no-arrow-class-property": [true]
  }
}
```

```js
class Foo {
  // bad
  foo = () => {}

  // good
  bar() {}
}
```

## Contributors
Karthik Viswanathan -- karthik.ksv@gmail.com

## License
Binding rules is [MIT licensed](LICENSE).

[semaphore-img]: https://semaphoreci.com/api/v1/karthikv/binding_rules/branches/master/badge.svg
[semaphore-url]: https://semaphoreci.com/karthikv/binding_rules
[no-unbound-method]: https://palantir.github.io/tslint/rules/no-unbound-method/
[autobind-decorator]: https://github.com/andreypopp/autobind-decorator
