export interface IStoreData {
  ar_font_style?: string;
  main_color?: string;
  main_bg_color?: string;
  font_color?: string;
  second_color?: string;
  login_with_email_only?: number;
  login_with_mobile_only?: number;
  store_title?: string;
  store_logo?: string;
  favicon?: string;
  description?: string;
  email?: string;
  currency: string;
}

export interface IShippingMethod {
  code: string;
  branch_id?: number;
}

export interface ISuccessData {
  order_number: number;
  created_at: Date;
  total: number;
  active_payment_method: string;
}
