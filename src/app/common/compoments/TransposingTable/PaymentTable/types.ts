import { Policy } from 'app/bff/models/service/paymentListMem';

export interface PaymentTableProps {
  policys: Policy[];
  emptyMessage: string;
  executePayment?: (policy: Policy) => void; // 執行直接付費
  executeVerify?: (policy: Policy) => void; // 執行驗身
}