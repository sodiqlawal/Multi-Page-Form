/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import switchValue from "lib/utils/switchValue";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FormContext,
  initialFormData,
  preparePayload,
  TFormData,
  TPages,
} from "./formUtils";
import "./CreateProduct.scss";
import Schedule from "./Schedule";
import Product from "./Product";
import Pickup from "./Pickup";
import Summary from "./Summary";
import { useDispatch } from "react-redux";
import { createProduct } from "store/actions/products";

const CreateProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState<TPages>("Product");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TFormData>(initialFormData);
  const completedPages = useRef<TPages[]>([]);

  const nextPage = () => {
    completedPages.current.push(page);

    const newPage = switchValue(page, {
      Product: "Schedule",
      Schedule: "Pickup",
      default: "Summary",
    }) as TPages;

    setPage(newPage);
  };

  const previousPage = () => {
    completedPages.current.pop();

    const newPage = switchValue(page, {
      Summary: "Pickup",
      Pickup: "Schedule",
      default: "Product",
    }) as TPages;

    setPage(newPage);
  };

  const submitForm = async () => {
    setIsSubmitting(true);

    const payload = await preparePayload(formData);
    dispatch(
      createProduct({
        product: payload,
        onSuccess: () => {
          history.push("/");
        },
        onCompleted: () => {
          setIsSubmitting(false);
        },
      })
    );
  };

  const getSideClassName = (pageName: TPages) =>
    classNames("form-progress_indicator", {
      active: page === pageName,
      done: completedPages.current.includes(pageName),
    });

  return (
    <FormContext.Provider
      value={{
        formData,
        page,
        setPage,
        previousPage,
        nextPage,
        setFormData,
        submitForm,
        isSubmitting,
      }}
    >
      <div className="product-cover">
        <p className="back" onClick={() => history.goBack()}>
          <span>&larr;</span>
          Back
        </p>

        <div className="product-bottom">
          <div className="side-bar">
            <div className="product-top"></div>

            <div className={getSideClassName("Product")}>
              <div className="left">
                <p>1</p>
                <div />
              </div>
              <div className="right">
                <p>Product</p>
              </div>
            </div>

            <div className={getSideClassName("Schedule")}>
              <div className="left">
                <p>2</p>
                <div />
              </div>
              <div className="right">
                <p>Schedule</p>
              </div>
            </div>

            <div className={getSideClassName("Pickup")}>
              <div className="left">
                <p>3</p>
                <div />
              </div>
              <div className="right">
                <p>Pickup</p>
              </div>
            </div>

            <div className={getSideClassName("Summary")}>
              <div className="left">
                <p>4</p>
                <div />
              </div>
              <div className="right">
                <p>Summary</p>
              </div>
            </div>
          </div>

          <div className="product form-container">
            {page === "Product" && <Product />}
            {page === "Schedule" && <Schedule />}
            {page === "Pickup" && <Pickup />}
            {page === "Summary" && <Summary />}
          </div>
        </div>
      </div>
    </FormContext.Provider>
  );
};

export default CreateProduct;
