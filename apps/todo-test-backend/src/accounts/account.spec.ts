import * as mongoose from 'mongoose';
import { getURL } from '../helpers/getStatic';
import {
  AddAccount,
  FindAccountByToken,
  FindAccountByUsername,
  RemoveAccountByToken,
  RemoveAccountByUsername,
  UpdateAccountByToken,
} from './account.model';

describe('DBTestAccount', () => {
  it('Add user', async () => {
    require('dotenv').config();
    await mongoose.connect(getURL());
    let success = await AddAccount({ username: 'Test', password: 'Test' });
    expect(success).toEqual(true);
  }, 5000);

  it('Get user by username', async function () {
    require('dotenv').config();
    await mongoose.connect(getURL());
    const query = await FindAccountByUsername('Test');
    expect(query.username).toEqual('Test');
  });

  it('Remove user by username', async function () {
    require('dotenv').config();
    await mongoose.connect(getURL());
    expect(await RemoveAccountByUsername('Test'));
  });
  //Token Functions==========================================================================================================
  it('Get user by token', async function () {
    require('dotenv').config();
    await mongoose.connect(getURL());
    await AddAccount({ username: 'Test', password: 'Test' });
    const query = await FindAccountByUsername('Test', '+authentication.token');
    const secondQuery = await FindAccountByToken(query.authentication.token);
    expect(secondQuery.username).toEqual('Test');
    await RemoveAccountByUsername('Test');
  });

  it('Update user', async function () {
    require('dotenv').config();
    await mongoose.connect(getURL());
    await AddAccount({ username: 'Temp', password: 'Temp' });
    expect(
      await UpdateAccountByToken(
        await FindAccountByUsername('Temp', '+authentication.token').then(
          (value) => value.authentication.token
        ),
        'Test',
        'Test'
      )
    ).toEqual(true);
  });

  it('Remove user token', async function () {
    require('dotenv').config();
    await mongoose.connect(getURL());
    expect(
      await RemoveAccountByToken(
        await FindAccountByUsername('Test', '+authentication.token').then(
          (value) => value.authentication.token
        )
      )
    );
  });
});
