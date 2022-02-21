export interface Colums {
  description: string;
  id: number;
  title: string;
}

export interface Prayers {
  checked: boolean;
  columnId: number;
  description: string;
  id: number;
  title: string;
}

export interface DataPrayer {
  title: string;
  description: string;
  checked: boolean;
}

export interface Comments {
  body: string;
  created: Date;
  id: number;
  prayerId: number;
  userId: number;
}
