import type { Meta, StoryObj } from '@storybook/react';
import { UpdateForm } from './update-form';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof UpdateForm> = {
  component: UpdateForm,
  title: 'UpdateForm',
};
export default meta;
type Story = StoryObj<typeof UpdateForm>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to UpdateForm!/gi)).toBeTruthy();
  },
};
