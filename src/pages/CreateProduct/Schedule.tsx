/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import { Formik, Form } from "formik";
import { TFormData, FormContext, scheduleValidationSchema } from "./formUtils";
import {
  MySelect,
  MyErrorMessage,
  MyField,
  MySubmitButton,
} from "components/Form/Form";
import { TScheduleFrequency } from "models/schdeule";
import { scheduleFrequency } from "config/constant";
import Button from "components/Form/SubmitButton/Button";

const Schedule = () => {
  const { formData, previousPage, nextPage, setFormData } =
    useContext(FormContext);

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
      validationSchema={scheduleValidationSchema}
    >
      {() => (
        <Form>
          <div className="schedule">
            <p className="title">Schedule</p>

            <hr className="rule" />

            <div className="form row">
              <div className="title required col-md-12 col-sm-12 mb-4">
                <label htmlFor="schedule_name">Schedule Name</label>
                <div className="input-container">
                  <MyField
                    name="schedule_name"
                    type="text"
                    className="form-control"
                    id="schedule_name"
                    placeholder="Schedule Name"
                  />
                  <MyErrorMessage name="schedule_name" />
                </div>
              </div>
              <div className="title required col-md-12 col-sm-12 mb-4">
                <label htmlFor="schedule_frequency">Schedule Frequency</label>
                <div className="input-container">
                  <MySelect<TScheduleFrequency>
                    name="schedule_frequency"
                    options={Object.values(scheduleFrequency)}
                    getName={(option) => option.displayName}
                    getValue={(option) => option.name}
                    className="form-control custom-select"
                    id="schedule_frequency"
                    placeholder="Select frequency"
                  />
                </div>
                <MyErrorMessage name="schedule_frequency" />
              </div>

              <div className="title required col-md-12 col-sm-12 mb-4">
                <label htmlFor="schedule_duration">Schedule Duration</label>
                <div className="input-container">
                  <MyField
                    name="schedule_duration"
                    type="number"
                    className="form-control"
                    id="schedule_duration"
                    placeholder="Schedule Duration"
                  />
                  <MyErrorMessage name="schedule_duration" />
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

export default Schedule;
