
export default class BusDriver {
  constructor(name, busRoute, arrayOfGossip) {
    this.name = name;
    this.busRoute = busRoute;
    this.setOfGossip = new Set(arrayOfGossip);
  }

  setStopIndex(index) {
    this.stopIndex = index;
  }

  moveDriverToNextStop() {
    this.stopIndex++;
    if (this.stopIndex % this.busRoute.length === 0) {
      this.stopIndex = 0;
    }
  }
}
