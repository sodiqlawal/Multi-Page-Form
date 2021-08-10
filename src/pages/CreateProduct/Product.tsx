/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from "formik";
import { useContext } from "react";
import {
  MyErrorMessage,
  MyField,
  MyTextArea,
  MySubmitButton,
  MyFileInput,
} from "components/Form/Form";
import { MyCurrencyInput } from "components/Form/CurrencyInput/CurrencyInput";
import { FormContext, productValidationSchema, TFormData } from "./formUtils";
import Button from "components/Form/SubmitButton/Button";

const Product = () => {
  const { formData, nextPage, setFormData } = useContext(FormContext);

  return (
    <Formik<TFormData>
      initialValues={formData}
      enableReinitialize
      validateOnMount
      onSubmit={(values) => {
        setFormData(values);
        nextPage();
        document
          .querySelector(".page-content")
          ?.scrollTo({ top: 0, behavior: "smooth" });
      }}
      validationSchema={productValidationSchema}
    >
      {({ values, resetForm }) => (
        <Form>
          <div className="product-details">
            <div>
              <p className="title">Product</p>
              <hr />

              <div className="form row">
                <div className="title required col-md-12 col-sm-12 mb-4">
                  <label htmlFor="name">Product Name</label>
                  <div className="input-container">
                    <MyField
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                    />
                    <MyErrorMessage name="name" />
                  </div>
                </div>

                <div className="title required col-md-12 col-sm-12 mb-4">
                  <label htmlFor="title">Product Title</label>
                  <div className="input-container">
                    <MyField
                      name="title"
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Title"
                    />
                    <MyErrorMessage name="title" />
                  </div>
                </div>

                <div className="title required col-md-12 col-sm-12 mb-4">
                  <label htmlFor="description">Description</label>
                  <MyTextArea
                    name="description"
                    className="form-control"
                    id="description"
                    placeholder="Description"
                  />
                  <MyErrorMessage name="description" />
                </div>

                <div className="title required col-md-12 col-sm-12 mb-4">
                  <label htmlFor="unit_price">Unit Price</label>
                  <MyCurrencyInput
                    name="unit_price"
                    className="form-control"
                    id="unit_price"
                    prefix="$"
                    placeholder="$ 5,000"
                  />
                  <MyErrorMessage name="unit_price" />
                </div>

                <div className="title col-md-12 col-sm-12 required mb-3">
                  <label htmlFor="image">Product Image</label>
                  <MyFileInput
                    name="imageFile"
                    getFileName={(file) => file.name}
                    mimeTypes={["image/jpeg", "image/png", "image/jpg"]}
                    id="image"
                    className="form-control"
                    placeholder="Select Image"
                    imageUrl={formData.image || ""}
                  />
                  <MyErrorMessage name="imageFile" />
                </div>

                <div className="button-cover">
                  <Button
                    type="button"
                    content="Reset"
                    onClick={() => resetForm()}
                  />
                  <MySubmitButton content="Continue" />
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Product;
