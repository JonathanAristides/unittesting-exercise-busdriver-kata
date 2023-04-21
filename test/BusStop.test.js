import BusStop from "../src/BusStop";
import BusDriver from "../src/BusDriver.js";

describe("BusStop class", () => {
  it("should addDriversToStop()", function () {
    //Arrange
    const busStop = new BusStop(1);
    const busDriver = new BusDriver("Bob", 1, ["gossip1"]);
    //Act
    busStop.addDriverToStop(busDriver);
    //Assert
    expect(busStop.driversCurrentlyAtStop.has(busDriver)).toBe(true);
  });

  it("should removeDriversFromStop()", function () {
    //Arrange
    const busStop = new BusStop(1);
    const busDriver = new BusDriver("Bob", 1, ["gossip1"]);
    busStop.addDriverToStop(busDriver);
    //Act
    busStop.removeDriversFromStop();
    //Assert
    expect(busStop.driversCurrentlyAtStop.has(busDriver)).toBe(false);
  });

  it("should shareGossip() between drivers at this stop", function () {
    //Arrange
    const busStop = new BusStop(1);
    const busDriver1 = new BusDriver("Bob", 1, ["gossip1"]);
    const busDriver2 = new BusDriver("Alice", 1, ["gossip2"]);
    busStop.addDriverToStop(busDriver1);
    busStop.addDriverToStop(busDriver2);
    //Act
    busStop.shareGossip();
    //Assert
    expect(busDriver1.setOfGossip.has("gossip2")).toBe(true);
    expect(busDriver2.setOfGossip.has("gossip1")).toBe(true);
  });

  it("should deleteCurrentGossipAtStop() after sharing gossip", function () {
    //Arrange
    const busStop = new BusStop(1);
    const busDriver1 = new BusDriver("Bob", 1, ["gossip1"]);
    const busDriver2 = new BusDriver("Alice", 1, ["gossip2"]);
    busStop.addDriverToStop(busDriver1);
    busStop.addDriverToStop(busDriver2);
    //Act
    busStop.shareGossip();
    busStop.clearCurrentGossipAtStop();
    //Assert
    expect(busStop.setOfsharedGossip.size).toBe(0);
  });
});
