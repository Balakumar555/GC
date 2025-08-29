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
  isNFS?:any;
  disable?: any;
  isSortable?: any;



  shouldRenderInput?: (row: any) => boolean;
  canEdit?: (row: any) => boolean;
}

export const userColumns: TableColumn[] = [
  {
    name: 'Name',
    dataKey: 'name',
    position: 'left',
  },
    {
    name: 'Email',
    dataKey: 'email',
    position: 'left',
  },
    {
    name: 'Date of Birth',
    dataKey: 'dob',
    position: 'left',
  },
    {
    name: 'Gender',
    dataKey: 'gender',
    position: 'left',
  },
];
