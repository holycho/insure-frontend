import NavItem from './NavItem';

export interface SlidingTab01Props {
  className?: string;
  children: React.ReactNode;
}

export interface SlidingTab01ChildComponent {
  NavItem: typeof NavItem;
}
