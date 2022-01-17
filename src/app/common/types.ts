export type MyTask = {
  title: string;
  id: number;
  creationData: Date;
  isBeingEdited?: boolean;
};

export type MyFolder = {
  id: number;
  title: string;
  creationData: Date;
  isBeingEdited?: boolean;
};
