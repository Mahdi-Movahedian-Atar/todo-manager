import mongoose from 'mongoose';
import { ITask } from '../tasks/task.model';
import { passwordHash, random, tokenHash } from '../helpers/numberGenerator';

export interface IAccount {
  username: string;
  password: string;
  tasks: ITask[];
  authentication: {
    password: string;
    salt: string;
    token: string;
  };
}

const AccountSchema = new mongoose.Schema<IAccount>({
  username: { type: String, unique: true, index: true, required: true },
  tasks: {
    type: [
      {
        title: { type: String, required: true },
        state: { type: String, required: true },
        description: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    token: { type: String, select: false, unique: true, index: true },
  },
});
export const AccountModel = mongoose.model<IAccount>('Account', AccountSchema);

export const AddAccount = async (account: {
  username: string;
  password: string;
}): Promise<boolean> => {
  let query = await AccountModel.find({
    username: account.username,
  });

  if (query.length == 0) {
    await AccountModel.create({
      username: account.username,
      authentication: { password: account.password, salt: random() },
    }).then((value) => {
      value.authentication.token = tokenHash(
        value.authentication.salt,
        value.id
      );
      value.authentication.password = passwordHash(
        value.authentication.salt,
        account.password
      );
      value.save();
    });
    return true;
  }
  return false;
};

export const RemoveAccountByUsername = async (username: string) => {
  return AccountModel.findOneAndRemove({ username: username });
};

export const RemoveAccountByToken = async (token: string) => {
  return AccountModel.findOneAndRemove({ 'authentication.token': token });
};

export const FindAccountByUsername = async (
  username: string,
  select?: string
) => {
  return AccountModel.findOne({ username: username }).select(select);
};

export const FindAccountByToken = async (token: string, select?: string) => {
  return AccountModel.findOne({ 'authentication.token': token }).select(select);
};

export const UpdateAccountByToken = async (
  token: string,
  username?: string,
  password?: string
) => {
  const query = await AccountModel.findOne({
    'authentication.token': token,
  }).select('+authentication.salt +authentication.password');

  if (query) {
    if (username) query.username = username;
    if (password)
      query.authentication.password = passwordHash(
        query.authentication.salt,
        password
      );
    query.save();
    return true;
  }
  return false;
};
