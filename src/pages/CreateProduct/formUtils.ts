import { countries } from "config/countries.json";
import { scheduleFrequency } from "config/constant";
import { readBase64 } from "lib/utils/fileHandler";
import switchValue from "lib/utils/switchValue";
import { TProduct } from "models/product";
import { TScheduleFrequency } from "models/schdeule";
import { createContext } from "react";
import * as yup from "yup";

export type TPages = "Product" | "Schedule" | "Pickup" | "Summary";

export interface TFormData {
  name: string;
  title: string;
  description: string;
  unit_price: string;
  image: File | string | null;
  schedule_name: string;
  schedule_frequency: TScheduleFrequency;
  schedule_duration: number;
  pickup_name: string;
  pickup_title: string;
  pickup_country: { country: string; states: string[] };
  pickup_states: string[];
  pickup_state: string;
  pickup_city: string;
  pickup_zip_code: string;
  pickup_address: string;
}

export const initialFormData: TFormData = {
  name: "",
  title: "",
  description: "",
  unit_price: "",
  image: null,
  schedule_name: "",
  schedule_frequency: scheduleFrequency.WEEKLY,
  schedule_duration: 0,
  pickup_name: "",
  pickup_title: "",
  pickup_country: { country: "", states: [""] },
  pickup_states: [],
  pickup_state: "",
  pickup_city: "",
  pickup_zip_code: "",
  pickup_address: "",
};

export interface TFormState {
  formData: TFormData;
  page: TPages;
  setPage: (page: TPages) => void;
  nextPage: () => void;
  previousPage: () => void;
  setFormData: (formData: TFormData) => void;
  submitForm: () => void;
  isSubmitting: boolean;
}

export const FormContext = createContext<TFormState>({
  formData: initialFormData,
  page: "Product",
  setPage: () => {},
  nextPage: () => {},
  previousPage: () => {},
  submitForm: () => {},
  setFormData: () => {},
  isSubmitting: false,
});

// this is the main request payload generator, this is send at the submit form stage
export const preparePayload = async (formData: TFormData) => {
  const formPayload: TProduct = {
    name: formData.name,
    title: formData.title,
    description: formData.description,
    unit_price: formData.unit_price,
    image: formData.image ? await readBase64(formData.image as File) : "",
    schedule_name: formData.schedule_name,
    schedule_frequency: switchValue(formData.schedule_frequency.name, {
      "BI-WEEKLY": 2,
      MONTHLY: 4,
      default: 1,
    }),
    schedule_duration: formData.schedule_duration,
    pickup_name: formData.pickup_name,
    pickup_title: formData.pickup_title,
    pickup_country: formData.pickup_country.country,
    pickup_state: formData.pickup_state,
    pickup_city: formData.pickup_city,
    pickup_zip_code: formData.pickup_zip_code,
    pickup_address: formData.pickup_address,
  };
  return formPayload;
};

// this is for converting the product response from the backend to the form data structure, mainly for editing
export const prepareFormData = (data: TProduct) => {
  const country = countries.find(
    (country) => country.country === data.pickup_country
  );
  const frequency = switchValue(data.schedule_frequency.toString(), {
    "2": "BI-WEEKLY",
    "4": "MONTHLY",
    default: "WEEKLY",
  });
  const formData: TFormData = {
    name: data.name,
    title: data.title,
    description: data.description,
    unit_price: data.unit_price,
    image: data.image,
    schedule_name: data.schedule_name,
    schedule_frequency:
      scheduleFrequency[frequency as TScheduleFrequency["name"]],
    schedule_duration: data.schedule_duration,
    pickup_name: data.pickup_name,
    pickup_title: data.pickup_title,
    pickup_country: { country: country?.country!, states: country?.states! },
    pickup_states: country?.states!,
    pickup_state: data.pickup_state,
    pickup_city: data.pickup_city,
    pickup_zip_code: data.pickup_zip_code,
    pickup_address: data.pickup_address,
  };
  return formData;
};

// validation schemas
export const productValidationSchema = yup.object().shape({
  name: yup.string().nullable().required("Name is required"),
  title: yup.string().nullable().required("Title is required"),
  description: yup.string().nullable().optional(),
  unit_price: yup.string().required("Unit price is required"),
});

export const scheduleValidationSchema = yup.object().shape({
  schedule_name: yup.string().required("Schedule name is required"),
  schedule_frequency: yup.object().nullable(),
  schedule_duration: yup
    .number()
    .min(1, "Schedule duration is required")
    .required("schedule duration is required"),
});

export const pickupValidationSchema = yup.object().shape({
  pickup_name: yup.string().required("Pickup name is required"),
  pickup_title: yup.string().required("Pickup title is required"),
  pickup_country: yup.object().required("Pickup country is required"),
  pickup_state: yup.string().required("Pickup state is required"),
  pickup_city: yup.string().required("Pickup city is required"),
});
