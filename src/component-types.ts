import {ChangeEvent, FormEvent, MouseEvent} from 'react';

export type ButtonMouseListener = (
  event: MouseEvent<HTMLButtonElement>
) => void;

export type DivMouseListener = (event: MouseEvent<HTMLDivElement>) => void;

export interface GiftCard {
  id: string;

  type: 'jpg' | 'png';
}

export type InputChangeEvent = ChangeEvent<HTMLInputElement>;

export type InputFormEvent = FormEvent<HTMLInputElement>;

export type StyleMap = {[key: string]: string | number | boolean};
