import { Payload } from "boom";

export type of<T> = Partial<Omit<T, "id">>;
