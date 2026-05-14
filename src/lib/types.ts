export type LeadPayload = {
  name: string;
  phone: string;
  car?: string;
  service: string;
  preferred_time?: string;
  message?: string;
  consent_personal_data: boolean;
  consent_policy: boolean;
  honeypot?: string;
};

export type LeadResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};
