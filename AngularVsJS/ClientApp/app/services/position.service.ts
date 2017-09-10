import { Injectable, Inject } from '@angular/core';
import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import 'rxjs/add/operator/map'
import{ PositionType} from "../models/enums/positionType";
import { PositionStatus } from "../models/enums/positionStatus";
import { PositionItem } from "../models/position";
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PositionService {
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
    }

    listPositions(): Promise<PositionItem[]> {
        return this.http.get(this.baseUrl + 'api/Positions/AllPositionsTask')
            .toPromise()
            .then(response => {
                var returnList = response.json().map((position: PositionItem) => {
                    var pos = new PositionItem();
                    pos = this.convertComingByteToEnum(pos, position.type, position.status);

                    pos.id = position.id;
                    pos.date = (position.date as Date);
                    pos.name = position.name;
                    pos.description = position.description;
                    return pos;
                });
                return returnList;
            });
               
    }

    listFilteringPositions(obj: any[]): Promise<PositionItem[]> {
        const body = JSON.stringify(obj);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.baseUrl + 'api/Positions/FilteringPositionsTask',)
            .toPromise()
            .then(response => {
                var returnList = response.json().map((position: PositionItem) => {
                    var pos = new PositionItem();
                    pos = this.convertComingByteToEnum(pos, position.type, position.status);

                    pos.id = position.id;
                    pos.date = (position.date as Date);
                    pos.name = position.name;
                    pos.description = position.description;
                    return pos;
                });
                return returnList;
            });

    }


    getPosition(id: number) {
        return this.http.get(this.baseUrl + 'api/Positions/GetPositionsTask/' + id.toString())
            .map(response => {
                var pos = new PositionItem();
                pos = this.convertComingByteToEnum(pos, response.json().type, response.json().status);
                pos.id = response.json().id;
                pos.date = (response.json().date as Date);
                pos.name = response.json().name;
                pos.description = response.json().description;
                console.log(pos);
                return pos;
            });
    }

    savePosition(obj: PositionItem): Observable<PositionItem> {
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.baseUrl + 'api/Positions/SavePosition', body, options)
            .map(data => data.json() as PositionItem);
    }

    createPosition(obj: PositionItem): Observable<PositionItem>{
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + 'api/Positions/CreatePositionTask', body, options)
            .map(data => data.json() as PositionItem);
            
    }

    deletePosition(obj: PositionItem): Observable<PositionItem> {
        const body = JSON.stringify(obj);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.baseUrl + 'api/Positions/DeletePositionTask', body, options)
            .map(data => data.json() as PositionItem);
    }

    convertComingByteToEnum(pos: PositionItem,
        posType: PositionType,
        posStatus: PositionStatus): PositionItem {
        switch (posType) {
        case 0:
            pos.type = PositionType.Deffect;
            break;
        case 1:
            pos.type = PositionType.Task;
            break;
        }

        switch (posStatus) {
        case 0:
            pos.status = PositionStatus.New;
            break;
        case 1:
                pos.status = PositionStatus.Active;
            break;
        case 2:
                pos.status = PositionStatus.InProcess;
            break;
        case 3:
                pos.status = PositionStatus.Completed;
            break;
        case 4:
                pos.status = PositionStatus.Close;
            break;
        }
        return pos;
    }
}
