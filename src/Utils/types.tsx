// TODO convert type to relevant type instead of string 

export type UserInfo = {
  authProvider: string;
  carModel: string;
  email: string;
  fuelEfficiency: string;
  autoFuelEfficiency: string;
  fuelEfficiencyCalculationMethod: 'auto' | 'manual';
  fuelGrade: string;
  name: string;
  petrolStation: string;
  uid: string;
};

export type EarningsLogInfo = {
  id: string;
  date: Date;
  gojekEarnings: number;
  tadaEarnings: number;
  grabEarnings: number;
  rydeEarnings: number;
  totalRevenue: number;
  distance: number;
  discountedLitrePetrol: number;
  fuelEfficiency: number;
  petrolCost: number;
  totalProfit: number;
};

export type FuelLogInfo = {
  id: string;
  date: Date;
  isFullTank: boolean;
  petrolPumped: number;
  totalCost: number;
  costPerKm: number;
  mileage?: number;
};

export type FuelLogFormType = {
  date: Date;
  isFullTank: boolean;
  petrolPumped: number;
  totalCost: number;
  mileage?: number;
};
