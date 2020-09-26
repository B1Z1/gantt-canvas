import {AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, Renderer2} from '@angular/core';
import {animationFrameScheduler, fromEvent} from 'rxjs';
import {auditTime} from 'rxjs/operators';
import {GanttNode} from 'src/app/gantt/domain/gantt-node/GanttNode';

@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit, AfterContentInit, AfterViewInit {

  @Input()
  nodes: Array<GanttNode> = [];

  canvasWidth: number = 0;
  canvasHeight: number = 0;

  constructor(private readonly renderer: Renderer2,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    this.setCanvasSize();
    this.listenWindowResize();
  }

  private listenWindowResize(): void {
    fromEvent(window, 'resize')
      .pipe(auditTime(0, animationFrameScheduler))
      .subscribe(() => {
        this.setCanvasSize();
      });
  }

  private setCanvasSize(): void {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.changeDetectorRef.detectChanges();
  }
}
