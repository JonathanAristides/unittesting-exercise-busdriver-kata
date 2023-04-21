import BusStop from "./BusStop.js";

export default class BusDriver {
  constructor(name, busRoute, arrayOfGossip) {
    this.name = name;
    this.busRoute = busRoute;
    this.setOfGossip = new Set(arrayOfGossip);
    this.stopIndex = -1;
  }

  moveDriverToNextStop() {
    if (this.stopIndex === this.busRoute.length - 1) {
      this.stopIndex = 0;
      return;
    }
    this.stopIndex++;
  }
}
