import { Component, ViewChild } from '@angular/core';
import { DxDataGridModule,
  DxDataGridComponent,
  DxTemplateModule } from 'devextreme-angular';
import query from 'devextreme/data/query';
import { Service, Order } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;
  orders: Order[];
  expanded = true;
  totalCount: number;
  title = 'test-ap';
  statusOptions: any = [
    'All',
    'All Open',
    'New',
    'Active',
    'Uncooperative',
    'Closed',
    'Reopened',
  ];
  constructor(service: Service) {
    this.orders = service.getOrders();
    this.totalCount = this.getGroupCount('CustomerStoreState');
    this.onCollectionSelect = this.onCollectionSelect.bind(this);
    this.setCaseSelectBoxInstance = this.setCaseSelectBoxInstance.bind(this);
    this.onCaseStatusChange = this.onCaseStatusChange.bind(this);
    this.showPerformanceSummary = this.showPerformanceSummary.bind(this);
    this.showDoNotContactSummary = this.showDoNotContactSummary.bind(this);
}
getGroupCount(groupField) {
  return query(this.orders)
      .groupBy(groupField)
      .toArray().length;
}

onToolbarPreparing(e) {
  e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxDropDownButton',
      locateInMenu: 'auto',
      options: {
        width: 250,
        items: [
          {
            value: 'Single File',
            text: 'Single File',
          },
          {
            value: 'Multiple Files',
            text: 'Multiple Files',
          },
        ],
        displayExpr: 'text',
        valueExpr: 'value',
        onItemClick: this.onCollectionSelect.bind(this),
        text: '+ Add New File',
        elementAttr: {class: 'dropdownbutton'},
      },
    },
    {
      location: 'center',
      widget: 'dxSelectBox',
      class: 'dx-datagrid-toolbar-button',
      locateInMenu: 'auto',
      options: {
        placeholder: 'See All',
        items: this.statusOptions,
        value: 'All Open',
        showClearButton: false,
        acceptCustomValue: false,
        searchEnabled: false,
        width: 175,
        onInitialized: (v: any) => {
          this.setCaseSelectBoxInstance(v);
        },
        onSelectionChanged: (v: any) => {
          console.log('In function onSelectionChanged: ', v);
          this.onCaseStatusChange(v);
        },
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      class: 'dx-datagrid-toolbar-button',
      locateInMenu: 'auto',
      options: {
        icon: 'runner',
        onClick: () => {
          this.showPerformanceSummary();
        },
      },
    },
    {
      location: 'after',
      widget: 'dxButton',
      class: 'dx-datagrid-toolbar-button',
      locateInMenu: 'auto',
      options: {
        icon: 'docxfile',
        onClick: () => {
          this.showDoNotContactSummary();
        },
      },
    });
}

onCollectionSelect() {
  console.log('onCollectionSelect');
}

setCaseSelectBoxInstance(v: any) {
  console.log('setCaseSelectBoxInstance');
}
onCaseStatusChange(v: any) {
  console.log('onCaseStatusChange');
}

showPerformanceSummary() {
 console.log('showPerformanceSummary');
}
showDoNotContactSummary() {
    console.log('showDoNotContactSummary');
}

groupChanged(e) {
  this.dataGrid.instance.clearGrouping();
  this.dataGrid.instance.columnOption(e.value, 'groupIndex', 0);
  this.totalCount = this.getGroupCount(e.value);
}

collapseAllClick(e) {
  this.expanded = !this.expanded;
  e.component.option({
      text: this.expanded ? 'Collapse All' : 'Expand All'
  });
}

refreshDataGrid() {
  this.dataGrid.instance.refresh();
}
}
