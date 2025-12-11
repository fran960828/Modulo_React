export interface IcreateProyect {
  onCreate: () => void;
}
export interface IformProyectProp {
  onSave: (prop: Iproyect) => void;
  onCancel: () => void;
}

export interface Iproyect {
  id: string;
  title: string;
  description: string;
  date: string;
}
