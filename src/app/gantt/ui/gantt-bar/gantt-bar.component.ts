import {Component, Input, OnInit} from '@angular/core';
import {Coordinates} from 'src/app/gantt/domain/coordinates/Coordinates';

@Component({
  selector: 'app-gantt-bar',
  template: '',
  styleUrls: ['./gantt-bar.component.scss']
})
export class GanttBarComponent implements OnInit {

  @Input()
  id: number;

  @Input()
  set coords(coords: Coordinates) {
    const {x, y} = coords.getCoords();
    this.defaultX = this.currentX = x;
    this.defaultY = this.currentY = y;
  }

  @Input()
  color: string;

  @Input()
  width: number;

  private currentX: number;
  private currentY: number;

  private defaultX: number;
  private defaultY: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  setCoords(coords: Coordinates): void {
    const {x, y} = coords.getCoords();
    this.currentX = x;
    this.currentY = y;
  }

  getCoords(): { x: number, y: number } {
    return {x: this.defaultX, y: this.defaultY};
  }

  getActualCoords(): { x: number, y: number } {
    return {x: this.currentX, y: this.currentY};
  }

  getWidth(): number {
    return this.width;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.currentX, this.currentY, this.width, 32);
    ctx.closePath();
  }
}
