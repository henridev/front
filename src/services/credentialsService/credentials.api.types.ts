export interface AuthorityDTO {
  id: number;
  roles?: Array<number>;
  organisation?: string;
  line_id?: string;
  registration_number?: string;
}

export type ApiLoginResponse = Response;

export type ApiCredentialsResponse = AuthorityDTO[];
