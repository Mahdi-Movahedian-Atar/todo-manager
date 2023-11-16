import { useMutation } from 'react-query';
import axios from 'axios';
import { getAddress } from '../get-address';

export function LoginQuery() {
  return useMutation(
    'loginQuery',
    (data: { username: string; password: string }) => {
      return axios.request({
        method: 'post',
        url: getAddress() + '/account/',
        withCredentials: true,
        data: { username: data.username, password: data.password },
      });
    }
  );
}
export function LogoutQuery() {
  return useMutation('LogoutQuery', () => {
    return axios.request({
      method: 'get',
      url: getAddress() + '/account/',
      withCredentials: true,
    });
  });
}
export function RegisterQuery() {
  return useMutation(
    'RegisterQuery',
    (data: { username: string; password: string }) => {
      return axios.request({
        method: 'put',
        url: getAddress() + '/account/',
        withCredentials: true,
        data: { username: data.username, password: data.password },
      });
    }
  );
}
export function UpdateUser() {
  return useMutation(
    'UpdateUser',
    (data: {
      password: string;
      newUsername?: string;
      newPassword?: string;
    }) => {
      return axios.request({
        method: 'patch',
        url: getAddress() + '/account/',
        withCredentials: true,
        data: {
          password: data.password,
          newUsername: data?.newUsername,
          newPassword: data?.newPassword,
        },
      });
    }
  );
}
export function DeleteUser() {
  return useMutation('DeleteUser', (password: string) => {
    return axios.request({
      method: 'delete',
      url: getAddress() + '/account/',
      withCredentials: true,
      data: {
        password: password,
      },
    });
  });
}
