export class Coordinates {
  constructor(private x: number,
              private y: number) {
  }

  getCoords(): { x: number, y: number } {
    return {x: this.x, y: this.y};
  }

  updateCoords(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
