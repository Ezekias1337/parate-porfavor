import { Dispatch, SetStateAction } from "react";

export type SetStateBoolean = Dispatch<SetStateAction<boolean>>;
export type SetStateString = Dispatch<SetStateAction<string>>;
export type SetStateNumber = Dispatch<SetStateAction<number>>;
export type SetStateObject<T> = Dispatch<SetStateAction<T>>;
