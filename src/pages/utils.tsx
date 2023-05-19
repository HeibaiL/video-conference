import { ComponentType } from "react";
import dynamic from "next/dynamic";


type DisableSSR = (_arg: ComponentType) => ComponentType;

export const disableSSR: DisableSSR = (Component) => {
  const NoSSRComponent = dynamic(() => Promise.resolve(Component), { ssr: false });

  return Object.assign(NoSSRComponent, Component);
};