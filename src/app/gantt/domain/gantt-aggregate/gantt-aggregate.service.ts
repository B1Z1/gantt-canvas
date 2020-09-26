import {Injectable} from '@angular/core';
import {GanttNode} from 'src/app/gantt/domain/gantt-node/GanttNode';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GanttAggregateService {

  private nodes$: Subject<Array<GanttNode>> = new Subject<Array<GanttNode>>();
  private nodes: Array<GanttNode> = [];

  constructor() {
  }

  setNodes(nodes: Array<GanttNode>): void {
    this.nodes$.next(nodes);
    this.nodes = nodes;
  }

  selectNodes(): Observable<Array<GanttNode>> {
    return this.nodes$.asObservable();
  }

  getNodeById(id: number): GanttNode | null {
    return this.nodes.find(node => node.getId() === id);
  }
}
