import { Tabs } from "./Tabs";
import { Runtime } from "./Runtime";
import { BrowserAction } from "./BrowserAction";
export class Chrome {
  runtime: Runtime = new Runtime();
  tabs: Tabs = new Tabs(this);
  browserAction: BrowserAction = new BrowserAction();
  constructor(manifest?) {}
}
