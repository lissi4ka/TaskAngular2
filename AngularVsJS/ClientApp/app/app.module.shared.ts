import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { PositionTableComponent } from "./components/position/position-table.component";

import { CapitalizeFirstPipe } from "./pipies/capitalize";
import { EnumToArrayPipe } from "./pipies/enumToArray";

//Services
import { PositionService } from "./services/position.service";
import { PositionComponent } from "./components/position/position.component";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        PositionTableComponent,
        PositionComponent,
        CapitalizeFirstPipe,
        EnumToArrayPipe
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        BrowserModule,
        Ng2SmartTableModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'position-table', component: PositionTableComponent },
            { path: 'position/:id/:type', component: PositionComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        PositionService
    ]
})
export class AppModuleShared {
}
