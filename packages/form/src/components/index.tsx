export type stringAndFunc<T> = string | ((record: T, index: number) => React.ReactNode);

export interface OptionsBaeProps {
  options?: Record<string, any>[];
  postField?: stringAndFunc<Record<string, any>>;
  showField?: stringAndFunc<Record<string, any>>;
  renderOption?: (item: any) => any;
  onAddProps?: (
    item: Record<string, any>,
    index: number,
  ) => Record<string, any> & { disabled?: boolean };
}
