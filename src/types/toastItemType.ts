export type ToastType = 'success' | 'warning' | 'error';
export interface ToastItemType {
  id: string;
  type: ToastType;
  message: string;
}
