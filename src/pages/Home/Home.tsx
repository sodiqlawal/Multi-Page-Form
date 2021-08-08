import Table from "components/Table/Table";
import { TProduct } from "models/product";
import "./Home.scss";
import Action from "components/Table/Action";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "components/Form/SubmitButton/Button";
import { Link } from "react-router-dom";

const tableHead: { name: keyof TableData; displayName: string }[] = [
  { name: "name", displayName: "Name" },
  { name: "title", displayName: "Title" },
  { name: "description", displayName: "Description" },
  { name: "unit_price", displayName: "Unit Price" },
  { name: "schedule_name", displayName: "Schedule Name" },
  { name: "schedule_frequency", displayName: "Schedule Frequency" },
  { name: "schedule_duration", displayName: "Schedule Duration" },
  { name: "pickup_name", displayName: "Pickup Name" },
  { name: "action", displayName: "Actions" },
];
type TableData = TProduct & {
  action: React.ReactNode;
};
const Home = () => {
  const [isLoading] = useState(false);
  const history = useHistory();

  const dropDownSelected = (label: string, item: TProduct) => {
    if (label === "Edit product") {
      history.push("/edit-product");
    }
  };

  return (
    <div className="home">
      <div className="button-cover single">
        <Link to="/create-product">
          <Button content="Create Product" isLoading={false} />
        </Link>
      </div>
      <Table
        fields={tableHead}
        tableData={[]}
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

            default:
              return data[field.name];
          }
        }}
      />
    </div>
  );
};

export default Home;
