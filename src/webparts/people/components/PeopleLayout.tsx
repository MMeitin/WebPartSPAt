import { WebPartContext } from "@microsoft/sp-webpart-base";
import * as React from "react";
import { IItems } from "../../../models";
import { SPService } from "../../../services/index";
import { PeopleItem } from "./PeopleItem";
import { Spinner } from "office-ui-fabric-react";
import { PeopleFilter } from "./PeopleFilter";

interface IPeopleLayoutProps {
  listItems: string;
  context: WebPartContext;
}

export interface IPropertyControlsTestWebPartProps {
  numberValue: number;
}

export const PeopleLayout: React.FunctionComponent<IPeopleLayoutProps> = (
  props
) => {
  const [items, SetItems] = React.useState<IItems[]>([]);
  const [stateItems, setStateItems] = React.useState<IItems[]>([]);
  /*const [brandFilter, setBrandFilter] = React.useState<string>("");
  const [iTypeFilter, setiTypeFilter] = React.useState<string>("");
  const [maxPriceFilter, setMaxPriceFilter] = React.useState<number>();
  Estaba intentando crear los filtros por separado pero me ha faltado algo de tiempo para hacerlo.
  Quería hacerlo con estados separados pero me ha faltado algún detalle que me hacía fallar la lógica*/

  const handleFilterChange = (
    brand: string,
    iType: string,
    maxPrice: number
  ): void => {
    let newItems = items;

    if (brand) {
      //setBrandFilter(brand);
      newItems = items.filter((item) => item.Brand === brand);
    }
    if (iType) {
      //setiTypeFilter(iType);
      newItems = items.filter((item) => item.IType === iType);
    }
    if (maxPrice) {
      //setMaxPriceFilter(maxPrice);
      newItems = newItems.filter((item) => item.EmpDiscPrice <= maxPrice);
    }
    setStateItems(newItems);
  };

  /*const filteredItems = items.filter((item) => {
    if (brandFilter && item.Brand !== brandFilter) return false;
    if (iTypeFilter && item.IType !== iTypeFilter) return false;
    if (maxPriceFilter && item.EmpDiscPrice > maxPriceFilter) return false;
    return true;
  });*/

  React.useEffect(() => {
    const spServ: SPService = new SPService(
      props.context,
      props.context.pageContext.web.absoluteUrl
    );
    spServ
      .getItems(props.listItems)
      .then((items: IItems[]) => {
        SetItems(items);
        setStateItems(items);
      })
      .catch((error) => {
        console.log(error);
        setStateItems([]);
      });
  }, [props.listItems]);

  //Aquí debería recorrer la nueva lista de filtrados pero no me ha dado tiempo
  return (
    <>
      <PeopleFilter items={items} onFilterChange={handleFilterChange} />
      <h1>Items list</h1>
      {stateItems.length > 0 ? (
        stateItems.map((item: IItems) => {
          return <PeopleItem key={item.ID} item={item} />;
        })
      ) : (
        <Spinner label="I am definitely loading..." />
      )}
    </>
  );
};
