import { config } from '../../services/';

export interface ConfigState {
  readonly apiBaseUrl: string;
  readonly apiEndpoints: { [key: string]: string; };
  readonly coursesPageLength: number;
}

export const initialConfigState: ConfigState = config;
