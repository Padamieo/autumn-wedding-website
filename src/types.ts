
export type MinimalGuestData = {
  id: number;
  code: string;
  first: string;
  surname: string;
  alt: string;
  stay: number;
  participation: number;
  relationships: number[];
  replied: ExpectedResponses | undefined;
  user: string | undefined,
}

export type GuestData = MinimalGuestData & {
  date: string | undefined,
  opt: boolean | undefined,
  dietary: string | undefined;
  paid: boolean;
};

export type ExpectedResponses = "not" | "day" | "weekend";