var Runtime = (function () {
    function Runtime() {
        this.onMessage = {
            addListener: jest.genMockFn()
        };
    }
    return Runtime;
})();
exports.Runtime = Runtime;
