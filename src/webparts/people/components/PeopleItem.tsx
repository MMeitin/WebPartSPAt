import * as React from "react";
import { IItems } from "../../../models";
import { IImage } from "../../../models";
import { PrimaryButton } from "@fluentui/react";
import { TextField } from "@fluentui/react";

interface PeopleItemProps {
  item: IItems;
}

export const PeopleItem: React.FunctionComponent<PeopleItemProps> = (props) => {
  const [couponCode, setCouponCode] = React.useState("");
  const [isCouponApplied, setIsCouponApplied] = React.useState(false);

  const handleCouponCodeChange = (
    event: React.FormEvent<HTMLInputElement>,
    value: string
  ) => {
    setCouponCode(value);
  };

  const handleApplyCoupon = () => {
    if (couponCode === "CXZ111" && !isCouponApplied) {
      // Aplicar el cupón al artículo
      // ...
      // Me gustaría haber hecho la lógica de compra para aplicar el cupón correctamente y tan sólo un uso por compra.
      /*Quería añadirle una funcionalidad de fecha como habíamos visto y que según campaña, por ej. Black Friday, me gustaría que ese día se sacase un código específico, etc */

      setIsCouponApplied(true);
    }
  };

  const [image, SetImage] = React.useState<IImage>({
    fileName: "",
    serverRelativeUrl: "",
  });

  React.useEffect(() => {
    const img: IImage = JSON.parse(props.item.Image);
    SetImage(img);
  }, []);

  return (
    <div style={{ margin: "20px", border: "1px solid black", padding: "10px" }}>
      <img width={"25%"} src={image.serverRelativeUrl} alt={image.fileName} />
      <div style={{ marginLeft: "20px" }}>
        <span style={{ display: "block", fontWeight: "bold" }}>
          {props.item.Title}
        </span>
        <span style={{ display: "block" }}>{props.item.Brand}</span>
        <span style={{ display: "block" }}>{props.item.Model}</span>
        <span style={{ display: "block", marginTop: "10px" }}>
          Retail price: {props.item.RetailPrice}€
        </span>
        <span style={{ display: "block" }}>
          Employee discount price: {Number(props.item.EmpDiscPrice)}€
        </span>
        <span style={{ display: "block" }}>
          Discount percentage applied: {props.item.PercDisc}%
        </span>
        <TextField
          label="Coupon"
          value={couponCode}
          onChange={handleCouponCodeChange}
        />
        <PrimaryButton
          text="Apply Coupon"
          onClick={handleApplyCoupon}
          disabled={isCouponApplied} //Si se usa el código te desactiva la opción de añadir otro.
        />
      </div>
    </div>
  );
};
