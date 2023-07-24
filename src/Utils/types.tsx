export type UserInfo = {
  authProvider: string;
  carModel: string;
  email: string;
  fuelEfficiency: string;
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
  mileage?: number;
};
