export interface TProduct {
  id?: string;
  name: string;
  title: string;
  description: string;
  unit_price: string;
  image: string;
  schedule_name: string;
  schedule_frequency: string;
  schedule_duration: number;
  pickup_name: string;
  pickup_title: string;
  pickup_country: string;
  pickup_state: string;
  pickup_city: string;
  pickup_zip_code: string;
  pickup_address: string;
}
