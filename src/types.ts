
export type MinimalGuestData = Response & {
  id: number;
  code: string;
  first: string;
  surname: string;
  alt: string;
  stay: number;
  participation: number;
  relationships: number[];
}

export type ExpectedResponses = "not" | "day" | "weekend" | 'yes' | 'no';

type Response = {
  user: string | undefined;
  replied: ExpectedResponses | undefined;
};

export type GuestUpdate = Response & {
  dietary: string | undefined;
  opt: boolean | undefined,
  date: string | undefined,
  paid: boolean;
};

export type GuestUpdatePayload = { [id:string]: GuestUpdate };

export type GuestData = MinimalGuestData & GuestUpdate;