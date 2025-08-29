export interface Pagination00Props {
  initialPage?: number;
  perPageTotal: number;
  total: number;
  range?: number;
  onChange?: (currentPage: number, perPageTotal: number) => void;
}