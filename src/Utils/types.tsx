export type Log = {
  date: Date;
  distance: number;
  gojekEarnings: number;
  grabEarnings: number;
  tadaEarnings: number;
  totalEarnings: number;
  rydeEarnings: number;
  id: string;
};

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

export type LogInfo = {
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
