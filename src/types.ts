
export type GuestData = {
  id: number;
  code: string;
  first: string;
  surname: string;
  alt: string;
  stay: number;
  participation: number;
  relationships: number[];
  // limit following
  user: string | undefined,
  opt: boolean | undefined,
  replied: string | undefined;
  dietary: string | undefined;
  paid: boolean;
};

// {
// id: Number(dataArray[id]),
// code: dataArray[code],
// firstName: dataArray[firstName],
// surname: dataArray[surname],
// alt: dataArray[nickName],
// participation: Number(dataArray[participation]),
// relationships: relationNumbers,
// replied: '',
// Dietary
// paid: false
// }
