import * as React from "react";
import * as ReactDom from "react-dom";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { setup as pnpSetup } from "@pnp/common";

import DataCombiner from "./components/DataCombiner";

export default class DataCombinerWebPart extends BaseClientSideWebPart<{}> {

  public onInit(): Promise<void> {
    return super.onInit().then(() => {
      pnpSetup({ spfxContext: this.context });
    });
  }

  public render(): void {
    const element: React.ReactElement<{}> = React.createElement(DataCombiner,{});

    ReactDom.render(element, this.domElement);
  }
}
