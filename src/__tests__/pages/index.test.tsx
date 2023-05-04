import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useRouter } from "next/router";


import Home from "@/pages/index";


// mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn()
}));

const pushMock = jest.spyOn(jest, "fn");

// add return value query and push
useRouter.mockReturnValue({
  query: {},
  push: pushMock
});

describe("Home page", () => {
  
  it("is rendered in dom", async () => {
    

    render(<Home/>);

    const homePage = screen.getByTestId("home-page");

    expect(homePage).toBeInTheDocument();
  });


  it("check if redirect is triggered after button click", async () => {

    (global as any).fetch = jest.fn(() => {
      return Promise.resolve({ json: () => ({ roomId: "123123" }) });
    });
  
    render(<Home/>);

    const button = screen.getByTestId("get-call-btn");
    button.click();
    expect(pushMock).toBeCalledTimes(1);
  });
});
  