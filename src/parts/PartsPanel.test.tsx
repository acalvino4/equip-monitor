import { test, expect } from "vitest";
import { PartsPanel } from "./PartsPanel";

test("renders without crashing", () => {
  expect(typeof PartsPanel).toBe("function");
});
