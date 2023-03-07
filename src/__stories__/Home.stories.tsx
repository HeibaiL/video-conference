import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

//components
import HomePage from "@/pages/index";
import Layout from "@/layouts/Layout";

export default {
  title: "Components/Main",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = () => <Layout><HomePage/></Layout>;

export const Home = Template.bind({});