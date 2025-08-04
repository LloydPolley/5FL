import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import { describe } from "node:test";

const user = { id: "1234" };

describe("Hero", () => {
  test("renders hero", () => {
    render(<Hero user={null} />);
    expect(screen.getByTestId("hero")).toBeDefined();
  });
  describe("Not authenicated", () => {
    test("Get header", () => {
      render(<Hero user={null} />);
      expect(
        screen.getByText("Track Every Game, Every Player.")
      ).toBeInTheDocument();
    });
  });
  describe("Authenicated", () => {
    test("Get header", () => {
      render(<Hero user={user} />);
      expect(screen.getByText("Browse Active Teams")).toBeInTheDocument();
    });
  });
});
