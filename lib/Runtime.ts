export class Runtime implements ChromeJestMock.Runtime {
  id: string;
  lastError: Object;
  onMessage = {
    addListener: jest.fn()
  };
}
