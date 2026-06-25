/**
 * Shared Type Definitions for MAX AI - Digital Studio
 */

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Pillar {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
}

export interface ServicePrice {
  id: string;
  title: string;
  shortDescription: string;
  priceStart: number;
  priceEndLabel?: string;
  features: string[];
  isPopular?: boolean;
}

export interface LeadFormInput {
  fullName: string;
  email: string;
  companyName: string;
  selectedPainPoints: string[];
  selectedServices: string[];
  extraDetails?: string;
}
