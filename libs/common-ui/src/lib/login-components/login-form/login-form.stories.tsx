import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './login-form';

const meta: Meta<typeof LoginForm> = {
  component: LoginForm,
  title: 'LoginCard',
};
export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
};
