import Table from "components/Table/Table";
import { TProduct } from "models/product";
import "./Home.scss";
import Action from "components/Table/Action";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/Form/SubmitButton/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "store/actions/products";
import currencyFormatter from "lib/utils/currencyFormatter";

const tableHead: { name: keyof TableData; displayName: string }[] = [
  { name: "sn", displayName: "S/N" },
  { name: "name", displayName: "Name" },
  { name: "title", displayName: "Title" },
  { name: "unit_price", displayName: "Unit Price" },
  { name: "schedule_name", displayName: "Schedule Name" },
  { name: "schedule_duration", displayName: "Schedule" },
  { name: "pickup_name", displayName: "Pickup Name" },
  { name: "pickup_city", displayName: "Pickup City" },
  { name: "action", displayName: "Actions" },
];
type TableData = TProduct & {
  action: React.ReactNode;
  sn: number;
};
const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productReducer } = useSelector((select) => ({
    productReducer: select.productReducer,
  }));

  const { isLoading, products } = productReducer;

  const dropDownSelected = (label: string, { id }: TProduct) => {
    if (label === "Edit Product") {
      history.push(`/edit-product/${id}`);
    }

    if (label === "Delete Product") {
      dispatch(deleteProduct({ id: id as string }));
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="home">
      <div className="button-cover single">
        <Link to="/create-product">
          <Button content="Create Product" isLoading={false} />
        </Link>
      </div>
      <Table
        fields={tableHead}
        tableData={products}
        isLoading={isLoading}
        builder={(field, data, i) => {
          switch (field.name) {
            case "sn":
              return `${i + 1}.`;
            case "action":
              return (
                <Action
                  item={data}
                  labels={["Edit Product", "Delete Product"]}
                  onSelected={dropDownSelected}
                />
              );
            case "unit_price":
              return currencyFormatter(data.unit_price, "$");
            case "schedule_duration":
              return `${
                data.schedule_frequency * data.schedule_duration
              }  weeks`;

            default:
              return data[field.name];
          }
        }}
      />
    </div>
  );
};

export default Home;
