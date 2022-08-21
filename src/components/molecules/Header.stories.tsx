/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Header from './Header';

export default {
  title: 'components/molecules/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Sample1 = Template.bind({
  args: {
    username: 'username',
    signOutCallback: () => {},
  },
});
Sample1.args = {
  username: 'username',
  signOutCallback: () => {},
};
