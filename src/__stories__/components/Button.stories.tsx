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

const Template: ComponentStory<typeof ButtonComponent> = (args) => <ButtonComponent {...args} />;

export const Button = Template.bind({});
Button.args = {
  type: "primary",
  children: "Button",
};

