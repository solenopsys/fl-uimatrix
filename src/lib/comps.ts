import {Component, OnInit} from "@angular/core";
import {DgraphDataProvider, DgraphService} from "@solenopsys/fl-dgraph";

import {FilterCachedProvider, GraphItem, IdTitle, ProcessData} from "@solenopsys/ui-controls";
import {IdService} from "@solenopsys/fl-globals";
import {TestDataBuffered, TIMES} from "./test.data";
import {MenuItemData} from "@solenopsys/ui-navigate";
import {FreeProvider} from "@solenopsys/ui-controls";

@Component({
    selector: 'app-exhibition-sub-menu',
    template: '<ui-sub-menu [items]="subMenu"></ui-sub-menu>'
})
export class ExhibitSubMenuComponent {
    subMenu: { key: string, title: string }[] = [
        {key: 'test1', title: 'Пункт 1'},
        {key: 'test2', title: 'Пункт 2'},
        {key: 'test3', title: 'Пункт 3'},
    ];
}

@Component({
    selector: 'app-exhibition-select-entity',
    template: '<ui-select [dataProvider]="dp" [(value)]="value"></ui-select> - {{value}}'
})
export class ExhibitSelectEntityComponent {
    dp: FreeProvider;

    value = {uid: 0xc379};

    constructor(dg: DgraphService) {
        // @ts-ignore
        this.dp = new DgraphDataProvider(dg, 'rom.resource') as FreeProvider;
    }

}

@Component({
    selector: 'app-exhibition-top-panel',
    template: '<ui-top-pane></ui-top-pane>'
})
export class ExhibitTopPanelComponent {
}

@Component({
    selector: 'app-exhibition-tree',
    template: '<ui-menu [data]="menu"></ui-menu>'
})
export class ExhibitTreeComponent {

    menu: MenuItemData[] = [
        {name: 'test1', link: '/bla', icon: '/assets/icons/01-Interface-Essential/03-Menu/navigation-menu-1.svg'},
        {name: 'test2', link: '/bla', icon: '/assets/icons/01-Interface-Essential/04-Login-Logout/login.svg'},
        {
            name: 'subItems',
            link: '/bla',
            icon: '/assets/icons/01-Interface-Essential/04-Login-Logout/login.svg',
            items: [
                {
                    name: 'test1',
                    link: '/bla',
                    icon: '/assets/icons/01-Interface-Essential/03-Menu/navigation-menu-1.svg'
                },
                {name: 'test2', link: '/bla', icon: '/assets/icons/01-Interface-Essential/04-Login-Logout/login.svg'},
            ]
        }
    ];
}

export const TEST_PROCESSES: ProcessData[] = [
    {id: '1', title: 'сборка экструдера', term: 12},
    {id: '2', title: 'установка платы', term: 12}
];


@Component({
    selector: 'app-exhibition-select-save',
    template: '  {{value}}<br> <ui-select-save [dataProvider]="dp" [(value)]="value" (save)="save($event)"></ui-select-save> '
})
export class ExhibitFreeSelectSaveComponent {
    dp: FilterCachedProvider;

    value: IdTitle = {id: '0xc379', title: 'bla'};

    constructor(dg: DgraphService) {
        // @ts-ignore
        this.dp = new FilterCachedProvider((o: any) => {
            return {id: o.id, title: o.name};
        });
        this.dp.setData(TEST_PROCESSES);
    }

    save(name: string) {
        console.log('SAVE', name);
    }

}

@Component({
    selector: 'app-exhibition-select',
    template: '  {{value}}<br> <ui-select [dataProvider]="dp" [(value)]="value"></ui-select> '
})
export class ExhibitFreeSelectComponent {
    dp: FilterCachedProvider;

    value: IdTitle = {id: '0xc379', title: 'bla'};

    constructor(dg: DgraphService) {
        // @ts-ignore
        this.dp = new FilterCachedProvider((o: any) => {
            return {id: o.id, title: o.name};
        });
        this.dp.setData(TEST_PROCESSES);
    }

}


@Component({
    selector: 'app-exhibition-modall',
    template: '<ui-modal></ui-modal>'
})
export class ExhibitModalComponent {
}


@Component({
    selector: 'app-exhibition-icon-button',
    template: ' <ui-icon-button (click)="show=true"\n' +
        '                          [icon]="\'/assets/icons/01-Interface-Essential/03-Menu/navigation-menu-1.svg\'"\n' +
        '                          [title]="\'Menu\'" ></ui-icon-button> <div *ngIf="show">click ok</div>'
})
export class ExhibitIconButtonComponent {
    show = false;
}

@Component({
    selector: 'app-exhibition-path-tree',
    template: '<ui-path-tree [items]="items" [rootIds]="[\'0\',\'1\']"></ui-path-tree>',
})
export class ExhibitPathTreeComponent implements OnInit {

    items: GraphItem[] = [
        {id: '0', name: 'Облицовка здания', before: ['4'], long: 10, count: 2},
        {id: '1', name: 'Покраска здания', before: ['2', '3'], long: 10, count: 2},
        {id: '2', name: 'Установка лифта', before: ['4'], long: 25, count: 1},
        {id: '3', name: 'Вставка окон', before: ['4'], long: 20, count: 1},
        {id: '4', name: 'Постройка каркаса', before: ['5'], long: 60, count: 1},
        {id: '5', name: 'Фундамент', long: 60, count: 1},
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}

@Component({
    selector: 'app-exhibition-infinity-table',
    template: '<ui-infinity-table [key]="tableKey" ></ui-infinity-table>'
})
export class ExhibitInfinityTableComponent {
    fields = TIMES.fields;
    dataInterface: TestDataBuffered;
    tableKey

    constructor(private draph: DgraphService, private idService: IdService) {
        this.dataInterface = new TestDataBuffered();
        this.tableKey = idService.getNextId();
    }
}

