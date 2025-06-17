import { AccessControl } from 'accesscontrol';

const ac = new AccessControl();

ac.grant('guest')
  .readOwn('profile');

ac.grant('user')
  .extend('guest')
  .createOwn('data')
  .readOwn('data')
  .updateOwn('data')
  .deleteOwn('data');

ac.grant('admin')
  .extend('user')
  .createAny('data')
  .readAny('data')
  .updateAny('data')
  .deleteAny('data')
  .readAny('profile');

export { ac };
