import * as process from 'process';

export function getAddress(): string {
  return `${process.env.NX_PROTOCOL}://${process.env.NX_ROOT}:${process.env.NX_PORT}`;
}
