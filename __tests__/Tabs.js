jest.dontMock('./../lib/Tabs');
jest.dontMock('./../lib/Tab');
var Tab_1 = require('./../lib/Tab');
jest.dontMock('./../lib/Chrome');
var Chrome_1 = require('./../lib/Chrome');
describe("Chrome.tabs object", function () {
    var tabs;
    var url = 'test';
    var tab;
    var chrome;
    beforeEach(function () {
        chrome = new Chrome_1.Chrome;
        tabs = chrome.tabs;
        var onCreated = jest.genMockFunction();
        tabs.create({ url: url }, onCreated);
        tab = onCreated.mock.calls[0][0];
    });
    it("get_", function () {
        var onGet = jest.genMockFunction();
        tabs.get(tab.id, onGet);
        var tab_ = onGet.mock.calls[0][0];
        expect(tab_ instanceof Tab_1.Tab).toBeTruthy();
        expect(chrome.runtime.lastError).toBeUndefined();
    });
    it("create", function () {
        expect(tabs.create.mock.calls.length).toBe(1);
        expect(tabs.create.mock.calls[0][0].url).toBe(url);
        expect(tab instanceof Tab_1.Tab).toBeTruthy();
        expect(tabs['tabs'].length).toBe(1);
        expect(chrome.runtime.lastError).toBeUndefined();
    });
    it("setContentScript", function () {
        tabs.setContentScript(function (window) {
            window['func1'] = function () {
                return 13;
            };
        });
        var onCreated = jest.genMockFunction();
        tabs.create({ url: url }, onCreated);
        var tab = onCreated.mock.calls[0][0];
        expect(chrome.runtime.lastError).toBeUndefined();
        expect(tab.window['func1']()).toBe(13);
    });
    it("create with error", function () {
        tabs.setContentScript(function () {
            console.log(window['asd']());
        });
        var onCreated = jest.genMockFunction();
        tabs.create({ url: url }, onCreated);
        var tab = onCreated.mock.calls[0][0];
        expect(tab).toBeUndefined();
        expect(chrome.runtime.lastError).toBeDefined();
    });
    it("remove", function () {
        expect(tabs['tabs'].length).toBe(1);
        var onRemoved = jest.genMockFunction();
        tabs.remove(tab.id, onRemoved);
        expect(tabs['tabs'].length).toBe(0);
        expect(chrome.runtime.lastError).toBeUndefined();
    });
    it("executeScript", function () {
        var onExecute = jest.genMockFunction();
        tabs.executeScript(tab.id, { code: "window.test=function(){ return 'test1'; }; window.test();" }, onExecute);
        var results = onExecute.mock.calls[0][0];
        expect(results[0]).toBe('test1');
        expect(chrome.runtime.lastError).toBeUndefined();
    });
    it("executeScript with function before", function () {
        var onExecute = jest.genMockFunction();
        tab.window['func1'] = function (a) {
            return a + 1;
        };
        tabs.executeScript(tab.id, { code: "window.func1(1)" }, onExecute);
        var results = onExecute.mock.calls[0][0];
        expect(results[0]).toBe(2);
        expect(chrome.runtime.lastError).toBeUndefined();
    });
    it("execute with error", function () {
        var onExecute = jest.genMockFunction();
        tabs.executeScript(tab.id, { code: "window.xxx()" }, onExecute);
        var results = onExecute.mock.calls[0][0];
        expect(results).toBeUndefined();
        expect(chrome.runtime.lastError).toBeDefined();
    });
});
