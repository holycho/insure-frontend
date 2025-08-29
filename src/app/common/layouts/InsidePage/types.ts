import BasicHeader from './BasicHeader';

export interface InsidePageProps {
  children: React.ReactNode;
}

export interface InsidePageChildComponents {
  BasicHeader: typeof BasicHeader;
}