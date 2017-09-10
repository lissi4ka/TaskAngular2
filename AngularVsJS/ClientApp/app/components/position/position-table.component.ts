import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PositionItem } from"../../models/position";
import {PositionService} from "../../services/position.service";
import { PositionStatus } from "../../models/enums/positionStatus";
import { PositionType } from "../../models/enums/positionType";
import { LocalDataSource } from "ng2-smart-table";
import { FilteringOptions } from "../../models/filter/filterForPosition";

@Component({
    selector: 'position-table',
    templateUrl: './position-table.component.html',
    styleUrls:['./position-table.css']
})
export class PositionTableComponent implements OnInit{
    selectedItem: PositionItem;
    selectDateFormat: string;
    source: LocalDataSource;
    filteringOptions: FilteringOptions[]=[];
    option: any;
    positions: PositionItem[] = [];
    filteringList: PositionItem[]  = [];
    settings = {
        actions: {
            add: false,
            edit: false,
            delete: false,
            custom: [
                {
                    name: 'CustomEdit',
                    title: 'Edit ',
                },
                {
                    name: 'CustomDelete',
                    title: 'Delete ',
                }
            ],
        },
        columns: {
            type: {
                title: 'Type',
            },
            id: {
                title: 'ID',
                editable: false,
                addable: false,
            },
            name: {
                title: 'Full Name',
            },
            status: {
                title: 'Status',
            },
            
        },
    };

    constructor(private positionService: PositionService,
        private router: Router) {
        this.source = new LocalDataSource();
        this.positionService.listPositions().then((data) => {
            this.source.load(data);
            this.positions = data;
            this.filteringList = data;
        });
    }

    ngOnInit(): void {
        this.createFilteringOptions();
    }

    createDeffect() {
        this.router.navigate(['/position', 0, 'deffect']);
    }

    createTask() {
        this.router.navigate(['/position', 0, 'task']);
    }

    onCustom(event: any) {
        if (event.action == 'CustomDelete') {
            if (window.confirm('Are you sure you want to delete?')) {
                this.positionService.deletePosition(event.data).subscribe(data => {},
                    (err) => console.error(err),
                    () => {
                        this.positionService.listPositions().then((data) => {
                            this.source.load(data);
                            this.positions = data;
                        });
                    });
            } else {
                event.confirm.reject();
            }
        } else if(event.action == 'CustomEdit') {
            this.router.navigate(['/position', event.data.id,event.data.type]);
        }
      
    }

    filtering(event: any) {
        var checkdOptions = this.filteringOptions.filter(t => t.checked === true);
        var notCheckdOptions = this.filteringOptions.filter(t => t.checked === false);
        if (notCheckdOptions !== undefined) {
            notCheckdOptions.forEach(option => {
                switch (option.column) {
                case 'status':
                    this.filteringList =
                        this.filteringList.filter(position => position.status !==
                            (<any>PositionStatus)[option.value]);
                    break;
                case 'type':
                    this.filteringList =
                        this.filteringList.filter(position => position.type !==
                            (<any>PositionType)[option.value]);
                    break;
                }
            });
        }

        this.source.load(this.filteringList);
    }

    showInfoForSelectedItem(event : any) {
        this.selectedItem = event as PositionItem;
    }

    createFilteringOptions() {
        var keysType = Object.keys(PositionType);
        keysType.forEach(key => {
            this.filteringOptions.push({ value: key, title: key, checked: true, column: 'type'});
        });

        const keysStatus = Object.keys(PositionStatus);
        keysStatus.forEach(key => {
            if (key === PositionStatus.Active.toString() ||
                key === PositionStatus.Completed.toString()) {
                this.filteringOptions.push({ value: key, title: key, checked: true, column: 'status'});
            }
        });
    }
}
