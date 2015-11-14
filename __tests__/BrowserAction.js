jest.dontMock('./../lib/BrowserAction');
var BrowserAction_1 = require('./../lib/BrowserAction');
describe("BrowserAction", function () {
    it("Create", function () {
        var action = new BrowserAction_1.BrowserAction();
        expect(action.onClicked.addListener).toBeDefined();
    });
});
