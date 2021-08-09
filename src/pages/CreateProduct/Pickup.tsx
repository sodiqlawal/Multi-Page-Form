import { useContext, useState } from "react";
import { Formik, Form } from "formik";
import countries from "config/countries.json";
import { FormContext, TFormData, pickupValidationSchema } from "./formUtils";
import {
  MyErrorMessage,
  MyField,
  MyTextArea,
  MySelect,
  MySubmitButton,
} from "components/Form/Form";
import Button from "components/Form/SubmitButton/Button";

const Pickup = () => {
  const { formData, nextPage, previousPage, setFormData } =
    useContext(FormContext);
  const [states, setStates] = useState<string[]>(formData.pickup_states);

  const handleCountryChange = (countryName: string) => {
    const country = countries.countries.find(
      (country) => country.country === countryName
    );
    setStates(country?.states ?? []);
  };

  return (
    <Formik<TFormData>
      initialValues={formData}
      enableReinitialize
      validateOnMount
      onSubmit={(values) => {
        setFormData({ ...values, pickup_states: states });
        nextPage();
      }}
      validationSchema={pickupValidationSchema}
    >
      {() => (
        <Form>
          <div className="pickup">
            <p className="title">Pickup</p>

            <hr className="rule" />

            <div className="form row">
              <div className="title required col-md-6 col-sm-12 mb-4">
                <label htmlFor="name">Pickup Name</label>
                <div className="input-container">
                  <MyField
                    name="pickup_name"
                    type="text"
                    className="form-control"
                    id="pickup_name"
                    placeholder="Pickup Name"
                  />
                  <MyErrorMessage name="pickup_name" />
                </div>
              </div>

              <div className="title required col-md-6 col-sm-12 mb-4">
                <label htmlFor="pickup_title">Pickup Title</label>
                <div className="input-container">
                  <MyField
                    name="pickup_title"
                    type="text"
                    className="form-control"
                    id="pickup_title"
                    placeholder="Pickup Title"
                  />
                  <MyErrorMessage name="pickup_title" />
                </div>
              </div>

              <div className="title required col-md-6 col-sm-12 mb-4">
                <label htmlFor="pickup_country">Pickup Country</label>
                <div className="input-container">
                  <MySelect<{ country: string; states: string[] }>
                    name="pickup_country"
                    options={countries.countries}
                    getName={(option) => option.country}
                    getValue={(option) => option.country}
                    className="form-control custom-select"
                    id="pickup_country"
                    placeholder="Select pickup country"
                    onChange={(e) => handleCountryChange(e.target.value)}
                  />
                </div>
                <MyErrorMessage name="pickup_country" />
              </div>

              <div className="title required col-md-6 col-sm-12 mb-4">
                <label htmlFor="pickup_state">Pickup State</label>
                <div className="input-container">
                  <MySelect<string>
                    name="pickup_state"
                    options={states}
                    getName={(option) => option}
                    getValue={(option) => option}
                    className="form-control custom-select"
                    id="pickup_state"
                    placeholder="Select pickup state"
                    disabled={states.length === 0}
                  />
                </div>
                <MyErrorMessage name="pickup_state" />
              </div>

              <div className="title required col-md-12 col-sm-12 mb-4">
                <label htmlFor="pickup_zip_code">Pickup Zip-Code</label>
                <div className="input-container">
                  <MyField
                    name="pickup_zip_code"
                    type="text"
                    className="form-control"
                    id="pickup_zip_code"
                    placeholder="Pickup Zip Code"
                  />
                  <MyErrorMessage name="pickup_zip_code" />
                </div>
              </div>

              <div className="title required col-md-12 col-sm-12 mb-4">
                <label htmlFor="pickup_city">Pickup City</label>
                <div className="input-container">
                  <MyField
                    name="pickup_city"
                    type="text"
                    className="form-control"
                    id="pickup_city"
                    placeholder="Pickup City"
                  />
                  <MyErrorMessage name="pickup_city" />
                </div>
              </div>

              <div className="title required col-md-12 col-sm-12 mb-4">
                <label htmlFor="pickup_address">Pickup Address</label>
                <div className="input-container">
                  <MyTextArea
                    name="pickup_address"
                    type="text"
                    className="form-control"
                    id="pickup_address"
                    placeholder="Pickup Address"
                  />
                  <MyErrorMessage name="pickup_address" />
                </div>
              </div>

              <div className="button-cover">
                <Button
                  type="button"
                  content="Previous"
                  onClick={() => previousPage()}
                />
                <MySubmitButton content="Continue" />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Pickup;
