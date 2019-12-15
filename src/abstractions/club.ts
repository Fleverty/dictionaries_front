export interface Club {
  _id: string;
  name: string;
  countryId: number;
  nextMatchDay: string;
  numberOfGroup: number;
  expectingMoney: number;
  checked: boolean;
}
