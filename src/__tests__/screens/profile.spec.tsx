import React from "react";
import { render } from "@testing-library/react-native";

import Profile from "../../screens/Profile";

describe("profile screen", () => {
  test("check if show correctly input name ", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("profile-input-name");

    expect(inputName.props.testID).toBeTruthy();
  });

  test("check if show correctly button submit ", () => {
    const { getByTestId } = render(<Profile />);

    const buttonSubmit = getByTestId("profile-submit-button");

    expect(buttonSubmit.props.testID).toBeTruthy();
  });
});
