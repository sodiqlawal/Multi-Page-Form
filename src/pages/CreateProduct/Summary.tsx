import { useContext } from "react";
import { FormContext } from "./formUtils";
import titleCase from "lib/utils/titleCase";
import currencyFormatter from "lib/utils/currencyFormatter";
import Button from "components/Form/SubmitButton/Button";
import { useParams } from "react-router-dom";

const defaultVal = "----";
const Summary = () => {
  const params = useParams<{ id: string }>();
  const isEditing = !!params.id;
  const { formData, isSubmitting, submitForm, previousPage } =
    useContext(FormContext);

  return (
    <div className="summary">
      <p className="title">Review Your Product And Submit</p>

      <hr className="rule" />

      <div className="details">
        <div className="content">
          <p>PRODUCT DETAILS</p>
          <div>
            <p>Product Name</p>
            <p>{titleCase(formData.name)}</p>
          </div>
          <div>
            <p>Product Title</p>
            <p>{titleCase(formData.title)}</p>
          </div>
          <div>
            <p>Product descrption</p>
            <p>{formData.description || defaultVal}</p>
          </div>
          <div>
            <p>Unit Price</p>
            <p>{currencyFormatter(formData.unit_price)}</p>
          </div>
        </div>

        <hr />

        <div className="content">
          <p>SCHEDULE DETAILS</p>
          <div>
            <p>Schedule name</p>
            <p>{titleCase(formData.schedule_name)}</p>
          </div>
          <div>
            <p>Schedule frequency</p>
            <p>{titleCase(formData.schedule_frequency.name)}</p>
          </div>
          <div>
            <p>Schedule duration</p>
            <p>{formData.schedule_duration}</p>
          </div>
        </div>

        <hr />

        <div className="content">
          <p>PICKUP DETAILS</p>
          <div>
            <p>Pickup name</p>
            <p>{titleCase(formData.pickup_name)}</p>
          </div>
          <div>
            <p>Pickup title</p>
            <p>{titleCase(formData.pickup_title)}</p>
          </div>
          <div>
            <p>Pickup country</p>
            <p>{formData.pickup_country.country}</p>
          </div>
          <div>
            <p>Pickup state</p>
            <p>{formData.pickup_state}</p>
          </div>
          <div>
            <p>Pickup city</p>
            <p>{formData.pickup_city}</p>
          </div>
          <div>
            <p>Pickup address</p>
            <p>{formData.pickup_address}</p>
          </div>
          <div>
            <p>Pickup zip-code</p>
            <p>{formData.pickup_zip_code}</p>
          </div>
        </div>

        <hr />

        <div className="button-cover">
          <Button onClick={previousPage} content="Previous" />
          <Button
            onClick={submitForm}
            content={isEditing ? "Edit Product" : "Create Product"}
            isLoading={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
};

export default Summary;
