/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Cell {
  Dead,
  Alive,
}
/**
*/
export class QR {
  free(): void;
/**
* @param {string} str
* @returns {QR}
*/
  static new(str: string): QR;
/**
* @returns {number}
*/
  width(): number;
/**
* @returns {number}
*/
  cells(): number;
}
