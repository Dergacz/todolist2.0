import React from 'react';
import {Meta, Story} from '@storybook/react/types-6-0';
import AppWithRedux from '../AppWithRedux';


export default {
  title: 'Todolists/AppWithRedux',
  component: AppWithRedux,
  argTypes: {},
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {

};

