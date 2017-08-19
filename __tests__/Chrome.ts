jest.dontMock("./../lib/Chrome");
import { Chrome } from "./../lib/Chrome";
import { Tabs } from "./../lib/Tabs";
import { BrowserAction } from "./../lib/BrowserAction";
import { Runtime } from "./../lib/Runtime";
describe("Chrome", () => {
  it("create", () => {
    var chrome = new Chrome();
    expect(chrome.tabs instanceof Tabs).toBeTruthy();
    expect(chrome.runtime instanceof Runtime).toBeTruthy();
    expect(chrome.browserAction instanceof BrowserAction).toBeTruthy();
  });
});
