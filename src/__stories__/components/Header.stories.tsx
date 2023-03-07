import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

//components
import HeaderComponent from "@/layouts/Header";

export default {
  title: "Components/Header",
  component: HeaderComponent,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HeaderComponent>;

const Template: ComponentStory<typeof HeaderComponent> = (args) => <HeaderComponent {...args} />;

export const Header = Template.bind({});
