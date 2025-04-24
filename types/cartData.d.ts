export interface ICartItem {
  product_id: number;
  qty: number;
  variantId?: number;
}
export interface IPaymentItem {
  full_name: string;
  email: string;
  phone: string;
  coupon: string | "";
  address_id: number;
  country_id: number;
  payment_method: string;
  shipping_method: string;
  bank_account_id?: number;
  bank_transfer_file?: any;
  type?:string;
}
export interface IPaymentPayfort {
  url: string;
  service_command: string;
  access_code: string;
  merchant_identifier: string;
  merchant_reference: string;
  return_url: string;
  language: string;
  merchant_extra1: number | null;
  merchant_extra2: string;
  signature: string;
}

export interface ITabbyItem {
  merchant_code: string;
  merchant_urls: {
    success: string;
    cancel: string;
    failure: string;
  };
  lang: string;
  payment: {
    amount: string;
    currency: string;
    buyer: {
      name: string;
      email: string;
      phone: string;
      dob: null;
    };
    buyer_history: {
      registered_since: string;
      loyalty_level: 0;
      wishlist_count: 0;
      is_social_networks_connected: null;
      is_phone_number_verified: null;
      is_email_verified: null;
    };
    shipping_address: {
      city: string;
      address: string;
      zip: string;
    };
    order: {
      reference_id: string;
      shipping_amount: "0";
      tax_amount: "0";
      discount_amount: "0";
      items: [];
    };
    order_history: [];
    description: "";
  };
}
