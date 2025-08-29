export interface CityAreaResp {
  city: City[];
}

export interface City {
  cityId: string;
  cityName: string;
  area: Area[];
}

export interface Area {
  areaId: string;
  areaName: string;
  postCode: string;
}
