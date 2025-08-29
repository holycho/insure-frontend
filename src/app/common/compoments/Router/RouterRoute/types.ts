import { RouteProps } from 'react-router-dom';

// 以 type 實體取聯集去建立新型別
export interface RouterRouteProps extends RouteProps {
  activate?: (() => boolean)[];
}

// v6 的 RouteProps 改為 union，故只能用 union 擴展
// export type RouterRouteProps = RouteProps & {
//   activate?: (() => boolean)[];
// }