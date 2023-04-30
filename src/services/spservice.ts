import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI, spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { IItems } from "../models";

interface ISPService {
  getItems(_listItems: string): Promise<IItems[]>;
}

export class SPService implements ISPService {
  private _sp: SPFI = null;
  public constructor(_context: WebPartContext, _tenantUrl: string) {
    this._sp = spfi(_tenantUrl).using(SPFx(_context));
  }

  public getItems(_listItems: string): Promise<IItems[]> {
    const select: string =
      "ID, Title, IType, Model, Brand, Image, RetailPrice, EmpDiscPrice, PercDisc, Code/Title, Code/Value";
    return this._sp.web.lists
      .getByTitle(_listItems)
      .items.expand("Code")
      .select(select)();
  }
}
