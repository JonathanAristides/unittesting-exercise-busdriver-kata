export default class BusStop {
  constructor(busStopNumber) {
    this.busStopNumber = busStopNumber;
    this.driversCurrentlyAtStop = new Set();
    this.setOfsharedGossip = new Set();
  }

  addDriverToStop(driver) {
    this.driversCurrentlyAtStop.add(driver);
  }

  removeDriversFromStop() {
    this.driversCurrentlyAtStop.clear();
  }

  shareGossip() {
    this.driversCurrentlyAtStop.forEach((driver) => {
      driver.setOfGossip.forEach((gossip) => {
        this.setOfsharedGossip.add(gossip);
      } );
    });



    this.driversCurrentlyAtStop.forEach((driver) => {
      driver.setOfGossip = this.setOfsharedGossip;
    });
  }

  clearCurrentGossipAtStop() {
    this.setOfsharedGossip = new Set()
  }
}
