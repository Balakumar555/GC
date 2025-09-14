import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DataPropertyGetterPipe } from '../../../pipes/data-property-getter.pipe';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
//import { DropDownComponent } from '../../shared/drop-down/drop-down.component';
import { DynamicPipe } from '../../../pipes/dynamic.pipe';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

//import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SelectionModel } from '@angular/cdk/collections';
import { MatRadioModule } from '@angular/material/radio';
//import { CollegeScoutingService } from '../../../services/college-scouting.service';
//import * as XLSX from 'xlsx';
//import { FileSaverService } from 'ngx-filesaver';
//import FileSaver from 'file-saver';
//import jsPDF from 'jspdf';
//import autoTable from 'jspdf-autotable';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkDrag, DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from '@angular/material/button';
import { TableColumn } from '../../../shared/table-columns-config';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}
@Component({
  selector: 'panthers-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    DataPropertyGetterPipe,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    DynamicPipe,
    MatSelect,
    MatOption,
    MatCheckboxModule,
    NgxSpinnerModule,
    //InfiniteScrollModule,
    MatRadioModule,
    //FileSaverModule,
    MatTooltipModule,
    DragDropModule,
    CdkDrag,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [DynamicPipe],
  templateUrl: './panthers-table.component.html',
  styleUrl: './panthers-table.component.css',
})

export class PanthersTableComponent implements OnInit, AfterViewInit {
  public tableDataSource = new MatTableDataSource([]);
  public displayedColumns: string[] | undefined;
  @ViewChild(MatPaginator, { static: true })
  matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  defense: any;
  selection = new SelectionModel<any>(true, []);

  @Input() isDraggable = false;
  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() wrapText = false;
  @Input() enableExport = false;
  @Input() tableColumns: TableColumn[] | undefined;
  @Input() rowActionIcon?: string;
  @Input() rowIcon?: string | any[];
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[1];
  @Input() isServerSidePagination = false;
  @Input() isInfiniteScroll = false;
  @Input() filterValue: string = '';
  @Input() playerActive: boolean = false;
  @Input() activePlayerId: string | null = null;
  @Input() selectedWorkouId: string | null = null;
  @Input() totalRecords: number = 0;

  //@Output() sort = new EventEmitter<Sort>();
  @Output() rowAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
  @Output() optionSelected = new EventEmitter<any>();
  @Output() updateScrollAction = new EventEmitter<boolean>();
  @Output() cellEdited = new EventEmitter<{
    row: any;
    field: string;
    value: any;
  }>();
  @Output() finalizedRow = new EventEmitter<any>();
  filter: any;
  filterCriteria: Record<string, string> = {};
  editField: any;
  tempEditvalue: any;
  editIndex: any;
  selectedOption: any;
  hasLinkColumn: boolean = false;
  originalData: any;
  isSelected: any;
  sortParameters: { active: string; direction: string } = {
    active: '',
    direction: '',
  };
  lastTrueProspectIndex: number | undefined;
  tempRowCounter: any = 0;
  currentPage: number = 0;
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }
  @Input() noRecord: boolean = false;
  isLoading: boolean = false;
  @ViewChild('editCell') editCellRef!: ElementRef;
  @Input() skipNextClick = false;


  checkboxOptions: CheckboxOption[] = [
    { id: 'team-roster', label: 'Team Roster', checked: false },
    { id: 'team-stats', label: 'Team Stats', checked: false },
    { id: 'off-depth-charts', label: 'Off. Depth Charts', checked: false },
    { id: 'def-depth-charts', label: 'Def. Depth Charts', checked: true },
    { id: 'roster-changes', label: 'Roster Changes', checked: true },
    { id: 'players-placed-reserve', label: 'Players Placed on Reserve List', checked: false },
    { id: 'how-they-built', label: 'How They were Built', checked: false },
    { id: 'weekly-active-inactive', label: 'Weekly Active/Inactive List', checked: false },
    { id: 'general-game-notes', label: 'General Game Notes', checked: false },
    { id: 'offense-procedure', label: 'Offense Procedure', checked: false },
    { id: 'state-offense', label: 'State of the Offense', checked: false },
    { id: 'offensive-player-notes', label: 'Offensive Player Notes', checked: false },
    { id: 'defense-procedure', label: 'Defense Procedure', checked: false },
    { id: 'state-defense', label: 'State of the Defense', checked: false },
    { id: 'defense-player-notes', label: 'Defense Player Notes', checked: false },
    { id: 'special-teams', label: 'Special Teams', checked: false }
  ];

  constructor(
    private spinner: NgxSpinnerService,
    //private collegeScoutingService: CollegeScoutingService
  ) {}

  ngOnInit(): void {
    // this.spinner.show('tabledata');
    this.hasLinkColumn =
      this.tableColumns?.some((col) => col.isLink === true) ?? false;

    this.spinner.getSpinner('tabledata').subscribe((spinner) => {
      this.isLoading = spinner.show;
    });
    const columnNames: any = this.tableColumns?.map(
      (tableColumn: TableColumn) => tableColumn.name
    );

    this.setDisplayedColumns();
    //checking whether pagination is server or client
    //if (this.isServerSidePagination) {
    //this.paginateData();
    // } else {
    if (this.isPageable) {
      this.matPaginator.length = this.totalRecords;
      this.tableDataSource.paginator = this.matPaginator;
    }
    //}
    //filtering the data based on specific columns
    this.tableDataSource.filterPredicate = (data: any, filter: string) => {
      const criteria = JSON.parse(filter);
      return Object.keys(criteria).some((key) => {
        const columnValue = data[key] || '';
        return columnValue
          .toString()
          .toLowerCase()
          .includes(criteria[key].toLowerCase());
      });
    };

    //this.spinner.hide('tabledata');
  }

  toArray(value: any): any[] {
    return Array.isArray(value) ? value : [value];
  }

  setDisplayedColumns() {
    const columnNames: any = this.tableColumns?.map((col) => col.name) || [];
    const rowIcons = Array.isArray(this.rowIcon)
      ? this.rowIcon
      : [this.rowIcon];
    //const extras = [this.rowActionIcon, ...rowIcons].filter(Boolean);
    // const extras = [this.rowActionIcon, ...rowIcons].filter(Boolean);
    const extras = rowIcons.filter(Boolean).length > 0 ? ['actions'] : [];
    this.rowIcon = Array.isArray(this.rowIcon) ? this.rowIcon : [this.rowIcon];
    this.rowIcon = Array.isArray(this.rowIcon) ? this.rowIcon : [this.rowIcon];
    this.displayedColumns = [...columnNames, ...extras];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    setTimeout(() => {
      if (this.skipNextClick) {
        this.skipNextClick = false; // reset
        return;
      }
      const target = event.target as HTMLElement;
      if (this.editIndex != null && this.editField != null) {
        const currentCellSelector = `[data-cell-id="${this.editIndex}-${this.editField}"]`;
        const clickedInside = target.closest(currentCellSelector);

        if (!clickedInside) {
          this.stopEdit();
        }
      }
      this.tableDataSource.data.forEach((row, index) => {
        const isInputMode = this.tableColumns?.some((col) =>
          col.shouldRenderInput?.(row)
        );

        if (!isInputMode) return;

        const rowSelector = `[data-row-id="${this.getRowId(row)}"]`;
        const clickedInsideAddRow = target.closest(rowSelector);

        if (!clickedInsideAddRow) {
          const allFilled = this.areRequiredFieldsFilled(row);

          if (allFilled) {
            this.checkRowFinalization(row);
          } else if (this.isNewRow(row)) {
            // Remove incomplete newly added row
            this.tableDataSource.data.splice(index, 1);
            this.tableDataSource._updateChangeSubscription();
            this.finalizedRow.emit(null);
          }
        }
      });
    }, 80);
  }

  getRowId(row: any): string {
    if (row?.id) return `row-${row.id}`;

    if (!row._tempRowId) {
      row._tempRowId = `temp-${this.tempRowCounter++}`;
    }

    return `row-${row._tempRowId}`;
  }

  areRequiredFieldsFilled(row: any): boolean {
    const requiredFields: any = this.tableColumns
      ?.filter((col) => col.isRequired)
      .map((col) => col.dataKey);

    return requiredFields.every((key: any) => {
      const value = row[key];
      return value !== null && value !== undefined && value !== '';
    });
  }

  isNewRow(row: any): boolean {
    return !row.id && !row.rowFinalized;
  }

  findLastTrueProspect() {
    for (let i = this.tableDataSource.data.length - 1; i >= 0; i--) {
      if (this.tableDataSource.data[i]['prospect'] === 'y') {
        this.lastTrueProspectIndex = i;
        break;
      }
    }
  }

  //server side pagination
  paginateData(event: any) {
    // if (this.isServerSidePagination) {
    //   this.pageChange.emit({
    //     page: this.matPaginator.pageIndex + 1,
    //     pageSize: this.matPaginator.pageSize,
    //   });
    // }
    //    this.currentPage = event.pageIndex + 1; // MatPaginator is zero-indexed
    //   this.defaultPageSize = event.pageSize;
    //  // this.updatePagination();
    //   this.pageChange.emit({ page: this.currentPage, pageSize: this.defaultPageSize });

    //   this.currentPage = event.pageIndex + 1; // MatPaginator is zero-indexed
    // this.defaultPageSize = event.pageSize;

    // Don't call updatePagination here - let the parent component handle it
    // Just emit the page change event
    this.pageChange.emit({
      page: this.currentPage,
      pageSize: this.defaultPageSize,
      pageIndex: event.pageIndex,
    });
  }

  // updatePagination() {
  //   const totalPages = Math.ceil(this.totalRecords / this.defaultPageSize);
  //   if (this.currentPage > totalPages) {
  //     this.currentPage = totalPages;
  //   }
  //   this.updatePaginatedData();
  // }

  // updatePaginatedData() {
  //   const startIndex = (this.currentPage - 1) * this.defaultPageSize;
  //   const endIndex = startIndex + this.defaultPageSize;
  //   this.tableDataSource.data = this.tableDataSource.data.slice(startIndex, endIndex);
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterValue'] || this.filterValue) {
      this.applyFilter();
    } else if (changes['tableColumns']) {
      this.hasLinkColumn =
        this.tableColumns?.some((col) => col.isLink === true) ?? false;
      const columnNames: any = this.tableColumns?.map(
        (tableColumn: TableColumn) => tableColumn.name
      );

      this.setDisplayedColumns();
      if (changes['totalRecords'] && this.isPageable && this.matPaginator) {
        this.matPaginator.length = this.totalRecords;
        console.log('Updated paginator length to:', this.totalRecords);
      }
      // if (this.rowActionIcon) {
      //   this.displayedColumns = [...columnNames, this.rowActionIcon];
      // } else {
      //   this.displayedColumns = columnNames;
      // }
      // if (this.rowIcon) {
      //   this.displayedColumns = [...columnNames, this.rowIcon];
      // } else {
      //   this.displayedColumns = columnNames;
      // }

      // Update any internal rendering logic too
    }
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.sort = this.matSort;
    if (this.isPageable && this.totalRecords > 0) {
      this.matPaginator.length = this.totalRecords;
       this.tableDataSource.paginator = this.matPaginator;
    }
  }

  setTableDataSource(data: any) {
    this.tableDataSource.data = data;
    this.noRecord = this.tableDataSource.data.length == 0 ? true : false;
    if (this.isPageable && this.matPaginator && this.totalRecords > 0) {
      this.matPaginator.length = this.totalRecords;
       this.tableDataSource.paginator = this.matPaginator;
    }
    if (this.displayedColumns?.includes('Prospect')) {
      this.findLastTrueProspect();
    }
  }

  resetFilter() {
    this.tableDataSource.filter = '';
    if (this.tableDataSource.filteredData.length > 0) {
      this.noRecord = false;
    } else {
      this.noRecord = true;
    }
  }

  getAlignment(column: any, value: any): string {
    if (
      column.dataKey === 'currentGuar' &&
      column.alignmentCondition === 'conditional'
    ) {
      return value ? 'center' : 'left';
    }
    return column.position || 'left';
  }

  applyFilter() {
    if (!this.filterValue) {
      this.resetFilter();
      return;
    }
    const filterColumns: any = this.tableColumns?.filter(
      (x) => x.isFilter == true
    );
    filterColumns.forEach((item: { dataKey: string | number }) => {
      this.filterCriteria[item.dataKey] = this.filterValue;
    });

    this.tableDataSource.filter = JSON.stringify(this.filterCriteria);

    if (this.tableDataSource.filteredData.length == 0) {
      this.noRecord = true;
    } else {
      this.noRecord = false;
    }
  }

  sortTable(sortParameters: Sort) {
    console.log('Sorting event triggered:', sortParameters);
    const column = this.tableColumns?.find(
      (column) => column.name === sortParameters.active
    );
    if (column) {
      this.tableDataSource.sortingDataAccessor = (item, property) => {
        const value = item[column.dataKey];
        if (value && typeof value === 'number') {
          return Number(value);
        } else if (value && typeof value != 'number') {
          return value;
        } else {
          return 0;
        }
      };
      this.tableDataSource.sort = this.matSort;
    }
  }

  emitRowAction(
    event: any,
    actionType?: any,
    eventChecked?: any,
    dataKey?: any
  ) {
    let value;
    //this.isSelected=this.isSelected === event ? null : event;
    if (eventChecked) {
      value = {
        event: event,
        checked: eventChecked.checked,
        actionType: actionType,
        dataKey: dataKey,
      };
    } else if (actionType) {
      value = { event: event, actionType: actionType };
    } else {
      value = event;
    }
    this.rowAction.emit(value);
  }
  onRowClickAction(
    event: any,
    actionType?: any,
    eventChecked?: any,
    dataKey?: any
  ) {
    let value;
    if (eventChecked) {
      value = { event, checked: eventChecked.checked, actionType, dataKey };
    } else if (actionType) {
      value = { event, actionType, dataKey };
    } else {
      value = event;
    }
    this.rowAction.emit(value);
  }

  rowSelection(event: any) {
    this.isSelected = this.isSelected === event ? null : event;
    this.rowAction.emit(this.isSelected);
  }
  //css applying for specific column
  getClass(column: string) {
    const columndetails = this.tableColumns?.find((x) => x.name == column);
    if (columndetails?.iscss) {
      return columndetails.css;
    }
    return '';
  }

  //Inline Editing of table cell
  startEdit(index: any, element: any, field: string) {
    const column = this.tableColumns?.find((x) => x.dataKey == field);
    if (column?.canEdit?.(element)) {
      this.editIndex = index;
      this.editField = field;
      const key = column.assignKey || column.dataKey;
      this.tempEditvalue = element[key];
    }
  }

  stopEdit(index?: number, field?: string): void {
    const currentIndex = index !== undefined ? index : this.editIndex;
    const currentField = field !== undefined ? field : this.editField;
    if (currentIndex !== null && currentField !== null) {
      const editedItem = this.tableDataSource.data[this.editIndex];
      const column = this.tableColumns?.find(
        (col) => col.dataKey === currentField
      );
      const key = column?.assignKey || currentField;
      const newValue = editedItem[key];
      if (newValue !== this.tempEditvalue) {
        this.cellEdited.emit({
          row: editedItem,
          field: key,
          value: newValue,
        });
      }
    }
    this.editIndex = null;
    this.editField = null;
  }

  blockDecimal(event: KeyboardEvent, column: any): void {
    if (column.textType === 'number') {
      const blockedKeys = ['.', ',', 'e', 'E'];
      if (blockedKeys.includes(event.key)) {
        event.preventDefault(); // Block typing
      }
    }
  }

  sanitizeLength(event: Event, column: any): void {
    if (column.textType === 'text') {
      const input = event.target as HTMLInputElement;
      if (input.value.length > 250) {
        input.value = input.value.slice(0, 250);
      }
    }
  }

  selectionChange(event: any) {
    this.optionSelected.emit(event.value);
  }
  onScroll() {
    console.log('Scrolled to the end of the table!');
    this.updateScrollAction.emit(true);
  }

  changecheckbox(event: any) {
    console.log(event);
  }

  // exportToExcel(): void {
  //   if (!this.tableDataSource.data || this.tableDataSource.data.length === 0) {
  //     console.warn('No data to export');
  //     return;
  //   }

  //   const exportData = this.tableDataSource.data.map((row) => {
  //     const rowData: any = {};
  //     if (this.tableColumns != undefined) {
  //       this.tableColumns.forEach((col) => {
  //         if (col.dataKey) {
  //           rowData[col.name] = row[col.dataKey];
  //         }
  //       });
  //       return rowData;
  //     }
  //   });

  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
  //   const workbook: XLSX.WorkBook = {
  //     Sheets: { data: worksheet },
  //     SheetNames: ['data'],
  //   };
  //   const excelBuffer: any = XLSX.write(workbook, {
  //     bookType: 'xlsx',
  //     type: 'array',
  //   });

  //   const data: Blob = new Blob([excelBuffer], {
  //     type: 'application/octet-stream',
  //   });
  //   FileSaver.saveAs(data, 'table_export_' + new Date().getTime() + '.xlsx');
  // }

  // exportToPDF(): void {
  //   if (!this.tableDataSource.data || this.tableDataSource.data.length === 0) {
  //     console.warn('No data to export');
  //     return;
  //   }

  //   const doc = new jsPDF();

  //   // Prepare columns and rows
  //   const columns =
  //     this.tableColumns?.map((col) => ({
  //       header: col.name,
  //       dataKey: col.dataKey,
  //     })) || [];
  //   const rows = this.tableDataSource.data.map((row) => {
  //     const rowData: any = {};
  //     this.tableColumns?.forEach((col) => {
  //       if (col.dataKey) {
  //         rowData[col.dataKey] = row[col.dataKey];
  //       }
  //     });
  //     return rowData;
  //   });

  //   autoTable(doc, {
  //     columns: columns,
  //     body: rows,
  //     styles: { fontSize: 8 },
  //     headStyles: { fillColor: [22, 160, 133] }, // optional header background color
  //     margin: { top: 10 },
  //   });

  //   doc.save('table_export_' + new Date().getTime() + '.pdf');
  // }

  onActionClick(actionType: string, row: any) {
    if (actionType === 'view') {
      this.rowAction.emit(row);
    }
    
  }

  onDropdownChange(selectedValue: any, row: any, column: any): void {
    const selectedOption = column.dropdownData.find(
      (opt: any) => opt.value === selectedValue
    );
    const keyToAssign = column.assignKey || column.dataKey;

    // Set the selected ID or value
    row[keyToAssign] = selectedOption.value;
    if (column.dataKey !== keyToAssign) {
      row[column.dataKey] = selectedOption.label;
    }
    if (selectedOption.jsy !== undefined) {
      row.jsy = selectedOption.jsy;
    }

    if (selectedOption.position !== undefined) {
      row.position = selectedOption.position;
    }
    this.tableDataSource.data = [...this.tableDataSource.data];
    this.checkRowFinalization(row);
  }

  checkRowFinalization(row: any) {
    const requiredFields: any = this.tableColumns
      ?.filter((col) => col.isRequired)
      .map((col) => col.dataKey);

    const allFilled = requiredFields.every((key: any) => {
      const value = row[key];
      return value !== null && value !== undefined && value !== '';
    });

    if (allFilled && !row.rowFinalized) {
      const idColumn = this.tableColumns?.find(
        (col) => typeof col.shouldRenderInput === 'function'
      );
      if (typeof idColumn?.shouldRenderInput === 'function') {
        const idKey = this.extractKeyFromPredicate(idColumn?.shouldRenderInput);
        if (idKey) {
          row[idKey] = this.generateGameReportPlayerDeactiveId();
          this.finalizedRow.emit(row);
        }
      }
      // row.gameDayInjuryId = this.generateGameReportPlayerDeactiveId();
      // this.finalizedRow.emit(row);
    }
  }

  extractKeyFromPredicate = (predicateFn: Function): string | null => {
    const fnStr = predicateFn.toString();
    const match = fnStr.match(/row\.([a-zA-Z0-9_]+)/);
    return match ? match[1] : null;
  };
  generateGameReportPlayerDeactiveId(isLocalServer: boolean = false): string {
    let baseId = this.generateFourteenCharId(); // Generate ID
    const isLocal = window.location.hostname === 'localhost';
    if (isLocalServer) {
      baseId = baseId.substring(0, 4) + 'R' + baseId.substring(5);
    }

    return baseId;
  }

  private generateFourteenCharId(): string {
    const now = new Date();
    const yyyy = now.getFullYear().toString();
    const MM = (now.getMonth() + 1).toString().padStart(2, '0');
    const dd = now.getDate().toString().padStart(2, '0');
    const rand = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    return `${yyyy}${MM}${dd}${rand}`; // e.g., 20250730654321
  }

  toggleCustomBook(event: any) {
    console.log(event);
  }

  handleCellClick(element: any, tableColumn: any, index: number) {
    if (
      element.isLink === 'true' &&
      tableColumn.name === 'Date' &&
      tableColumn.isNFS === true
    ) {
      this.emitRowAction(element);
    } else {
      this.startEdit(index, element, tableColumn.dataKey);
    }
  }

  onLinkClick(row: any, col: any) {
    if (col.actionType === 'player') {
      this.rowAction.emit({
        type: 'player',
        playerId: row.playerId,
      });
    } else if (col.actionType === 'school') {
      this.rowAction.emit({
        type: 'school',
        schoolOrgId: row.schoolOrgId,
      });
    }
  }
}