import {Coordinates} from 'src/app/gantt/domain/coordinates/Coordinates';

export class GanttNode {
  constructor(private id: number,
              private name: string,
              private coordinates: Coordinates,
              private width: number,
              private color: string) {
  }

  getId(): number {
    return this.id;
  }

  getCoords(): Coordinates {
    return this.coordinates;
  }

  getWidth(): number {
    return this.width;
  }

  getColor(): string {
    return this.color;
  }

  updateCoords(x, y): void {
    this.coordinates.updateCoords(x, y);
  }
}
