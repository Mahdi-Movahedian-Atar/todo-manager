import type { Meta, StoryObj } from '@storybook/react';
import { RegisterForm } from './register-form';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof RegisterForm> = {
  component: RegisterForm,
  title: 'RegisterForm',
};
export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to RegisterForm!/gi)).toBeTruthy();
  },
};
