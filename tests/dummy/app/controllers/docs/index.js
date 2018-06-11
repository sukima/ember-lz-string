import Controller, { inject as controller } from '@ember/controller';
import { alias } from '@ember/object/computed';

const CODE_EXAMPLE = `export default class FooBar {
  constructor() {
    this.secret = 'FooBar';
  }
}`;

export default Controller.extend({
  application: controller(),
  foobar: alias('application.foobar'),
  codeExample: CODE_EXAMPLE
});
