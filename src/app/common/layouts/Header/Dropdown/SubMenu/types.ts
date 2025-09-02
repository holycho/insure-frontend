import { LinkInfo } from 'app/bff/models/linkUrl';

export interface SubMenuProps {
  subMenuItem: LinkInfo;
  onDropDownClose: () => void;
}