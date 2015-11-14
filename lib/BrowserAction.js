var BrowserAction = (function () {
    function BrowserAction() {
        this.onClicked = {
            addListener: jest.genMockFn()
        };
    }
    return BrowserAction;
})();
exports.BrowserAction = BrowserAction;
;
