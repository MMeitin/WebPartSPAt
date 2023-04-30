import * as React from "react";
import { IItems } from "../../../models";
import { Slider } from "office-ui-fabric-react";

interface PeopleFilterProps {
  items: IItems[];
  onFilterChange: (brand: string, iType: string, maxPrice: number) => void;
}

export const PeopleFilter: React.FC<PeopleFilterProps> = ({
  items,
  onFilterChange,
}) => {
  const brands = Array.from(new Set(items.map((item) => item.Brand)));
  const iTypes = Array.from(new Set(items.map((item) => item.IType)));
  const [maxPrice, setMaxPrice] = React.useState<number>(0);

  const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>):void => {
    const selectedBrand = event.target.value;
    onFilterChange(selectedBrand, "", maxPrice);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>):void => {
    const selectedType = event.target.value;
    onFilterChange("", selectedType, maxPrice);
  };

  const handlePriceChange = (newValue: number):void  => {
    // nuevo método de controlador de eventos para el componente Slider
    setMaxPrice(newValue);
    onFilterChange("", "", newValue);
  };

  return (
    <>
      <label htmlFor="brand">Brand:</label>
      <select name="brand" id="brand" onChange={handleBrandChange}>
        <option value="">All</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <label htmlFor="type">Type:</label>
      <select name="type" id="type" onChange={handleTypeChange}>
        <option value="">All</option>
        {iTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <Slider
        min={1}
        max={2000}
        step={1}
        defaultValue={500}
        value={maxPrice}
        label="Max Prize"
        onChange={handlePriceChange}
      />
    </>
  );
};
