jest.dontMock("../lib/BrowserAction");
import { BrowserAction } from "../lib/BrowserAction";

describe("BrowserAction", () => {
  it("Create", () => {
    var action = new BrowserAction();
    expect(action.onClicked.addListener).toBeDefined();
  });
});
