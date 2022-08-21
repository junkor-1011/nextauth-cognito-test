/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CognitoSignIn from './CognitoSignIn';

export default {
  title: 'components/page/CognitoSignIn',
  component: CognitoSignIn,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CognitoSignIn>;

const Template: ComponentStory<typeof CognitoSignIn> = (args) => <CognitoSignIn {...args} />;

export const Sample1 = Template.bind({});
Sample1.args = {};

export const Sample2 = Template.bind({});
Sample2.args = {
  authError: 'expired',
};
