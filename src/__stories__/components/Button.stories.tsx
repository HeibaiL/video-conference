import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

//component
import ButtonComponent from "@/components/Button";

export default {
  title: "Components/Button",
  component: ButtonComponent,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ButtonComponent>;

const primaryTemplate: ComponentStory<typeof ButtonComponent> = (args) => (
  <ButtonComponent {...args} >Submit</ButtonComponent>
);
const secondaryTemplate: ComponentStory<typeof ButtonComponent> = (args) => (
  <ButtonComponent {...args} >Submit</ButtonComponent>
);

export const PrimaryButton = primaryTemplate.bind({});
export const SecondaryButton = secondaryTemplate.bind({});

PrimaryButton.args = {
  type: "primary",
  children: "Button",
};

SecondaryButton.args = {
  type: "secondary",
  children: "Button",
};

