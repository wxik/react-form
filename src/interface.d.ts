export type FormData = Record<string, any>;

export interface Emitter {
  addListener: (key: string, Function) => void;
  removeListener: (key: string, Function) => void;
  emit: (key, ...value) => void;
}

export interface Required {
  required: boolean | ((formData: Object) => any);
}
