import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild
} from '@angular/core';
import {GanttBarComponent} from 'src/app/gantt/ui/gantt-bar/gantt-bar.component';
import {fromEvent} from 'rxjs';
import {filter} from 'rxjs/operators';
import {GanttSceneAggregateService} from 'src/app/gantt/domain/gantt-scene-aggregate/gantt-scene-aggregate.service';
import {GanttSceneStatus} from 'src/app/gantt/domain/gantt-scene-aggregate/GanttSceneStatus';
import {Coordinates} from 'src/app/gantt/domain/coordinates/Coordinates';

@Component({
  selector: 'app-gantt-scene',
  templateUrl: './gantt-scene.component.html',
  styleUrls: ['./gantt-scene.component.scss']
})
export class GanttSceneComponent implements OnInit, AfterContentInit, AfterViewInit {

  @Input()
  width: number;

  @Input()
  height: number;

  @ContentChildren(GanttBarComponent)
  bars: QueryList<GanttBarComponent> = new QueryList<GanttBarComponent>();

  @ViewChild('canvasElement')
  canvasElement: ElementRef<HTMLCanvasElement>;

  @ViewChild('scrollContainer')
  scrollContainer: ElementRef<HTMLDivElement>;

  fullWidth: number = 3200;
  fullHeight: number = 0;

  private actualScrollTop: number = 0;
  private actualScrollLeft: number = 0;

  constructor(private readonly ganttSceneAggregateService: GanttSceneAggregateService,
              private readonly renderer: Renderer2,
              private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.selectGanttSceneStatus();
  }

  ngAfterContentInit(): void {
  }

  ngAfterViewInit(): void {
    this.setFullHeight();
    this.listenContainerScroll();
    this.initializeScene();
  }

  private selectGanttSceneStatus(): void {
    this.ganttSceneAggregateService
      .selectStatus()
      .pipe(
        filter((value) => value === GanttSceneStatus.INITIALIZED)
      )
      .subscribe(() => {

      });
  }

  private setFullHeight(): void {
    this.fullHeight = this.calculateHeight();
    this.changeDetectorRef.detectChanges();
  }

  private listenContainerScroll(): void {
    const scrollContainerElement = this.scrollContainer.nativeElement;

    fromEvent(scrollContainerElement, 'scroll')
      .subscribe(() => {
        const {scrollLeft: left, scrollTop: top} = scrollContainerElement;
        let barsInViewport: Array<GanttBarComponent>;

        this.actualScrollLeft = left;
        this.actualScrollTop = top;

        barsInViewport = this.getBarsInViewport();
        this.ganttSceneAggregateService.setElementsInsideViewport(barsInViewport);

        for (const bar of this.bars) {
          const {x, y} = bar.getCoords();
          const coords = new Coordinates(x - left, y - top);
          bar.setCoords(coords);
        }
      });
  }

  private initializeScene(): void {
    const barsInViewport = this.getBarsInViewport();
    this.ganttSceneAggregateService.initializeScene(this.canvasElement.nativeElement, barsInViewport);
  }

  private calculateHeight(): number {
    return this.bars.length * 32;
  }

  private getBarsInViewport(): Array<GanttBarComponent> {
    const maxViewportX: number = this.actualScrollLeft + this.width + 100;
    const maxViewportY: number = this.actualScrollTop + this.height + 100;
    const barsInViewport = this.bars.filter((bar) => {
      const {x, y} = bar.getCoords();
      const inXViewport = this.actualScrollLeft - 100 <= x && x <= maxViewportX;
      const inYViewport = this.actualScrollTop - 100 <= y && y <= maxViewportY;

      return inXViewport && inYViewport;
    });

    return barsInViewport;
  }
}
