import type { Meta, StoryObj } from '@storybook/react';
import { TaskCard } from './task-card';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof TaskCard> = {
  component: TaskCard,
  title: 'TaskCard',
};
export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to TaskCard!/gi)).toBeTruthy();
  },
};
