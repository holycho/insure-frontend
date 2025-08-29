export interface InsuranceInfoFormValues {
  insured: {
    name: string;
    id: string;
    birthday: string;
    telAreaNo: string;
    telNo: string;
    telExtNo: string;
    mobile: string;
    postCode: string;
    cityId: string;
    areaId: string;
    address: string;
    email: string;
    occId: string;
    occDomain: string;
    feeSource: string;
    feeSourceNote: string;
    hearingDisability: string;
  },
  building: {
    postCode: string;
    cityId: string;
    areaId: string;
    address: string;
    buildingYear: string,
    mortgage: {
      hasMortgage: string;
      bankCode: string;
      branchCode: string;
      // contact: {
      //   isSentToBank: string;
      //   recipient: string;
      //   bankPostCode: string;
      //   bankCityId: string;
      //   bankAreaId: string;
      //   bankAddress: string;
      // };
      // 是否寄送銀行與相關資訊
      isSentToBank: string;
      recipient: string;
      contactPostCode: string;
      contactCityId: string;
      contactAreaId: string;
      contactAddress: string;
    };
    isInsuredWithOtherCompanies: string;
  },
  member: {
    code: string;
  }
}
