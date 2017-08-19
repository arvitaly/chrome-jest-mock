jest.dontMock("./../lib/Tabs");
import { Tabs } from "./../lib/Tabs";
jest.dontMock("./../lib/Tab");
import { Tab } from "./../lib/Tab";
jest.dontMock("./../lib/Chrome");
import { Chrome } from "./../lib/Chrome";

describe("Chrome.tabs object", () => {
  var tabs: Tabs;
  var url = "test";
  var tab: Tab;
  var chrome: Chrome;
  beforeEach(() => {
    chrome = new Chrome();
    tabs = chrome.tabs;
    var onCreated = jest.fn();
    tabs.create({ url: url }, onCreated);
    tab = onCreated.mock.calls[0][0];
  });
  it("get_", () => {
    var onGet = jest.fn();
    tabs.get(tab.id, onGet);
    var tab_ = onGet.mock.calls[0][0];
    expect(tab_ instanceof Tab).toBeTruthy();
    expect(chrome.runtime.lastError).toBeUndefined();
  });
  it("create", () => {
    expect(tabs.create.mock.calls.length).toBe(1);
    expect(tabs.create.mock.calls[0][0].url).toBe(url);
    expect(tab instanceof Tab).toBeTruthy();
    expect(tabs["tabs"].length).toBe(1);
    expect(chrome.runtime.lastError).toBeUndefined();
  });

  it("setContentScript", () => {
    tabs.setContentScript(window => {
      window["func1"] = function() {
        return 13;
      };
    });
    var onCreated = jest.fn();
    tabs.create({ url: url }, onCreated);
    var tab = onCreated.mock.calls[0][0];
    expect(chrome.runtime.lastError).toBeUndefined();
    expect(tab.window["func1"]()).toBe(13);
  });
  it("create with error", () => {
    tabs.setContentScript(() => {
      console.log(window["asd"]());
    });
    var onCreated = jest.fn();
    tabs.create({ url: url }, onCreated);
    var tab = onCreated.mock.calls[0][0];
    expect(tab).toBeUndefined();
    expect(chrome.runtime.lastError).toBeDefined();
  });
  it("remove", () => {
    expect(tabs["tabs"].length).toBe(1);
    var onRemoved = jest.fn();
    tabs.remove(tab.id, onRemoved);
    expect(tabs["tabs"].length).toBe(0);
    expect(chrome.runtime.lastError).toBeUndefined();
  });

  it("executeScript", () => {
    var onExecute = jest.fn();
    tabs.executeScript(
      tab.id,
      { code: "window.test=function(){ return 'test1'; }; window.test();" },
      onExecute
    );
    var results = onExecute.mock.calls[0][0];
    expect(results[0]).toBe("test1");
    expect(chrome.runtime.lastError).toBeUndefined();
  });
  it("executeScript with function before", () => {
    var onExecute = jest.fn();
    tab.window["func1"] = a => {
      return a + 1;
    };
    tabs.executeScript(tab.id, { code: "window.func1(1)" }, onExecute);
    var results = onExecute.mock.calls[0][0];
    expect(results[0]).toBe(2);
    expect(chrome.runtime.lastError).toBeUndefined();
  });
  it("execute with error", () => {
    var onExecute = jest.fn();
    tabs.executeScript(tab.id, { code: "window.xxx()" }, onExecute);
    var results = onExecute.mock.calls[0][0];
    expect(results).toBeUndefined();
    expect(chrome.runtime.lastError).toBeDefined();
  });
});
