export interface RollingStock {
  id: number;
  train_code: string;
  line_id: string;
  line_code: string;
  creation_date: Date;
  affectation_date: Date;
  modification_date: Date;
}
export enum RollingStockFilter {
  TO_CLEAN = 'toBeCleaned',
  TO_DISINFECT = 'toBeDisinfected',
  COMPLETED = 'completed',
}

export enum DisinfectionStatus {
  GREEN = 'green',
  ORANGE = 'orange',
  GREY = 'grey',
}

export enum dateValues {
  MEP = 'MEP',
  NP = 'NP',
  NC = 'NC',
  Dégraffitage = 'Dégraffitage',
  creation_date = 'creation_date',
  affectation_date = 'affectation_date',
  modification_date = 'modification_date',
}
