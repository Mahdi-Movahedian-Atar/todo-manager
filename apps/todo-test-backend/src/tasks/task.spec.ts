import mongoose from 'mongoose';
import { getURL } from '../helpers/getStatic';
import { FindAccountByUsername } from '../accounts/account.model';
import {
  AddTaskToAccount,
  RemoveTaskFromAccount,
  UpdateTaskFromAccount,
} from './task.model';

describe('DBTaskAccount', () => {
  it('Add Tasks', async function () {
    require('dotenv').config();
    await mongoose.connect(getURL());
    let success = await AddTaskToAccount(
      await FindAccountByUsername('Test', '+authentication.token').then(
        (value) => value.authentication.token
      ),
      [
        {
          title: 'a',
          state: 'idle',
          description: 'a',
          startDate: new Date(),
        },
        {
          title: 'b',
          state: 'idle',
          description: 'a',
          endDate: new Date(),
        },
      ]
    );
    expect(success).toEqual(true);
  });

  it('Update Tasks', async function () {
    require('dotenv').config();
    await mongoose.connect(getURL());
    let success = await UpdateTaskFromAccount(
      await FindAccountByUsername('Test', '+authentication.token').then(
        (value) => value.authentication.token
      ),
      [
        {
          task: {
            title: 'k',
            state: 'idle',
            description: 't',
            endDate: new Date(),
          },
          index: 0,
        },
        {
          task: {
            title: 'h',
            state: 'idle',
            description: 'ssss',
            startDate: new Date(),
          },
          index: 1,
        },
      ]
    );
    expect(success).toEqual(true);
  });

  it('Remove Tasks', async function () {
    require('dotenv').config();
    await mongoose.connect(getURL());
    let success = await RemoveTaskFromAccount(
      await FindAccountByUsername('Test', '+authentication.token').then(
        (value) => value.authentication.token
      ),
      0,
      2
    );
    expect(success).toEqual(true);
  });
});
