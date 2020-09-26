import {Injectable} from '@angular/core';
import {GanttSceneStatus} from 'src/app/gantt/domain/gantt-scene-aggregate/GanttSceneStatus';
import {BehaviorSubject, Observable} from 'rxjs';
import {GanttBarComponent} from 'src/app/gantt/ui/gantt-bar/gantt-bar.component';

@Injectable()
export class GanttSceneAggregateService {

  private status$: BehaviorSubject<GanttSceneStatus> = new BehaviorSubject<GanttSceneStatus>(GanttSceneStatus.NOT_INITIALIZED);

  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;

  private elementsInsideViewport: Array<GanttBarComponent> = [];

  constructor() {
  }

  initializeScene(canvas: HTMLCanvasElement, elementsInsideViewport: Array<GanttBarComponent>): void {
    this.setStatusPending();
    const ctx = canvas.getContext('2d');

    this.canvas = canvas;
    this.ctx = ctx;
    this.setElementsInsideViewport(elementsInsideViewport);
    this.render();

    this.setStatusInitialized();
  }

  selectStatus(): Observable<GanttSceneStatus> {
    return this.status$.asObservable();
  }

  setElementsInsideViewport(elements: Array<GanttBarComponent>): void {
    this.elementsInsideViewport = elements;
  }

  private setStatusPending(): void {
    this.status$.next(GanttSceneStatus.PENDING);
  }

  private setStatusInitialized(): void {
    this.status$.next(GanttSceneStatus.INITIALIZED);
  }

  private render(): void {
    this.clear();

    for (const element of this.elementsInsideViewport) {
      element.draw(this.ctx);
    }

    requestAnimationFrame(() => this.render());
  }

  private clear(): void {
    const {width, height} = this.canvas;

    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, width, height);
    this.ctx.closePath();
  }
}
