import type { Meta, StoryObj } from '@storybook/react';
import { TaskForm } from './task-from';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TaskForm> = {
  component: TaskForm,
  title: 'TaskForm',
};
export default meta;
type Story = StoryObj<typeof TaskForm>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TaskForm!/gi)).toBeTruthy();
  },
};
