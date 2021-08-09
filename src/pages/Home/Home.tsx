import Table from "components/Table/Table";
import { TProduct } from "models/product";
import "./Home.scss";
import Action from "components/Table/Action";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/Form/SubmitButton/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "store/actions/products";
import currencyFormatter from "lib/utils/currencyFormatter";
import switchValue from "lib/utils/switchValue";

function schedule(frequency: string, duration: number) {
  const weekNum = switchValue(frequency, {
    "BI-WEEKLY": 2,
    MONTHLY: 4,
    default: 1,
  });

  return `${weekNum * duration} weeks`;
}

const tableHead: { name: keyof TableData; displayName: string }[] = [
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
};
const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { productReducer } = useSelector((select) => ({
    productReducer: select.productReducer,
  }));

  const { isLoading, products } = productReducer;

  const dropDownSelected = (label: string, item: TProduct) => {
    if (label === "Edit product") {
      history.push("/edit-product");
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
        builder={(field, data) => {
          switch (field.name) {
            case "action":
              return (
                <Action
                  item={data}
                  labels={["Edit product"]}
                  onSelected={dropDownSelected}
                />
              );
            case "unit_price":
              return currencyFormatter(data.unit_price, "$");
            case "schedule_duration":
              return schedule(data.schedule_frequency, data.schedule_duration);

            default:
              return data[field.name];
          }
        }}
      />
    </div>
  );
};

export default Home;
