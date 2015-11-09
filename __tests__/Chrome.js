jest.dontMock('./../lib/Chrome');
var Chrome_1 = require('./../lib/Chrome');
var Tabs_1 = require('./../lib/Tabs');
var Runtime_1 = require('./../lib/Runtime');
describe("Chrome", function () {
    it("create", function () {
        var chrome = new Chrome_1.Chrome;
        expect(chrome.tabs instanceof Tabs_1.Tabs).toBeTruthy();
        expect(chrome.runtime instanceof Runtime_1.Runtime).toBeTruthy();
    });
});
