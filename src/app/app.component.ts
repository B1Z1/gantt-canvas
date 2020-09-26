import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {GanttNode} from 'src/app/gantt/domain/gantt-node/GanttNode';
import {Coordinates} from 'src/app/gantt/domain/coordinates/Coordinates';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  nodes: Array<GanttNode> = [];

  private count: number = 1000000;

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.count; i++) {
      const coordinates = new Coordinates(i, 32 * i);
      const node = new GanttNode(i, 'Node', coordinates, 100, 'red');

      this.nodes.push(node);
    }
  }

  ngAfterViewInit(): void {
  }

}
