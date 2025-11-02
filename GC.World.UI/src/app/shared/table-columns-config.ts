export interface TableColumn {
  name: string;
  dataKey: string;
  position?: 'right' | 'left' | 'center';
  assignKey?: any;
  wrapText?: any;
  wrapText2?: any;
  wrapText3?: any;
  wrapText4?: any;
  wrapText5?: any;
  isRequired?: any;
  isLink?: any;
  iscss?: any;
  css?: any;
  isFilter?: any;
  columnType?: any;
  textType?: any;
  dropdownData?: any;
  pipeArgs?: any;
  maxLength?: any;
  pipe?: any;
  isIcon?: any;
  isRowSelect?: any;
  isNFS?: any;
  disable?: any;
  isSortable?: any;

  shouldRenderInput?: (row: any) => boolean;
  canEdit?: (row: any) => boolean;
}

export const userListColumns: TableColumn[] = [
  {
    name: 'Name',
    dataKey: 'name',
    position: 'left',
    isSortable: false,
    iscss: false,
    columnType: '',
    isFilter: false,
  },
  {
    name: 'Email',
    dataKey: 'email',
    position: 'left',
    isSortable: false,
    iscss: false,
    columnType: '',
    isFilter: false,
  },
  {
    name: 'Gender',
    dataKey: 'gender',
    position: 'left',
    isSortable: false,
    iscss: false,
    columnType: '',
    isFilter: false,
  },
];
export const playerColumns: TableColumn[] = [
  {
    name: 'Id',
    dataKey: 'id',
    position: 'left',
    isSortable: false,
    iscss: false,
    columnType: '',
    isFilter: false,
  },
  {
    name: 'Name',
    dataKey: 'name',
    position: 'left',
    isSortable: false,
    iscss: false,
    columnType: '',
    isFilter: false,
  },
  {
    name: 'Jsy',
    dataKey: 'jsyNumber',
    position: 'left',
    isSortable: false,
    iscss: false,
    columnType: '',
    isFilter: false,
  },
];
