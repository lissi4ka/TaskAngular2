import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PositionService } from "../../services/position.service";

import { PositionItem  } from "../../models/position";
import { PositionType } from "../../models/enums/positionType";
import { PositionStatus } from "../../models/enums/positionStatus";


@Component({
    selector: 'position',
    templateUrl:'./position.component.html'
})
export class PositionComponent implements OnInit, OnDestroy {
    @ViewChild('positionForm') advanceForm: NgForm;
    public position: PositionItem = new PositionItem();
    type: string;
    id: number;
    statusies = PositionStatus;
    private selectedId: number;
    private routeSubscription: Subscription;

    constructor(private route: ActivatedRoute,
        private positionService: PositionService,
        private router: Router
    ) {
        this.routeSubscription = route.params.subscribe(params => this.type = params['type']);
        this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    }
    
   
    ngOnInit() {
        this.getPositionOrCreate();
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    public onSubmit(form: NgForm) {
        
        if(this.id !== undefined && this.id > 0)
        {
            if (form.valid) {
                this.positionService.savePosition(this.position)
                    .subscribe(data => this.position = data,
                    (err) => console.error(err),
                    () => { this.router.navigate(['/position-table']); });
            }
        }else{
            if (form.valid) {
                this.positionService.createPosition(this.position)
                    .subscribe(data => this.position = data,
                    (err) => console.error(err),
                    () => { this.router.navigate(['/position-table']); });
            }
        }
        // this.advanceService.saveAdvance(this.advance);
    }
    backToTable() {
        this.router.navigate(['/position-table']);
    }

    getPositionOrCreate() {
        if (this.id !== undefined && this.id > 0) {
            this.positionService.getPosition(this.id).subscribe(data => this.position = data);
        } else {
            switch (this.type) {
            case 'deffect':
                this.position = new PositionItem();
                this.position.type = PositionType.Deffect;
                this.position.name = '';
                this.position.status = PositionStatus.New;
                this.position.date = new Date();
                break;
            case 'task':
                this.position = new PositionItem();
                this.position.type = PositionType.Task;
                this.position.name = '';
                this.position.status = PositionStatus.New;
                this.position.date = new Date();
                break;
            }
        }
    }
}

