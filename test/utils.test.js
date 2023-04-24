import {
  addStartingDriverToBusStop, checkIfGossipTransferComplete,
  clearBusStopsOfGossip,
  createNewBusDrivers,
  createNewBusStops,
  moveAllDriversToTheirNextStop,
  shareGossipBetweenDriversAtSameStop,
} from "../src/utils.js";
import BusStop from "../src/BusStop.js";
import BusDriver from "../src/BusDriver.js";

describe("createNewBusDrivers", () => {
  it("should return an array of new busDriver objects", () => {
    // Arrange
    const routesArray = [
      [3, 1, 2, 3],
      [3, 2, 3, 1],
      [4, 2, 3, 4],
    ];
    const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];
    // Act
    const result = createNewBusDrivers(routesArray, startingGossip);
    // Assert
    expect(result).toEqual([
      {
        name: "Driver 0",
        busRoute: [3, 1, 2, 3],
        setOfGossip: new Set(["gossip1"]),
      },
      {
        name: "Driver 1",
        busRoute: [3, 2, 3, 1],
        setOfGossip: new Set(["gossip2"]),
      },
      {
        name: "Driver 2",
        busRoute: [4, 2, 3, 4],
        setOfGossip: new Set(["gossip3"]),
      },
    ]);
  });
});

describe("createNewBusStops", function () {
  it("should return an array of new busStop objects", function () {
    //Arrange
    const routesArray = [
      [3, 1, 2, 3],
      [3, 2, 3, 1],
      [4, 2, 3, 4],
    ];
    //Act
    const result = createNewBusStops(routesArray);
    //Assert
    expect(result).toEqual([
      {
        busStopNumber: 1,
        driversCurrentlyAtStop: new Set(),
        setOfsharedGossip: new Set(),
      },
      {
        busStopNumber: 2,
        driversCurrentlyAtStop: new Set(),
        setOfsharedGossip: new Set(),
      },
      {
        busStopNumber: 3,
        driversCurrentlyAtStop: new Set(),
        setOfsharedGossip: new Set(),
      },
      {
        busStopNumber: 4,
        driversCurrentlyAtStop: new Set(),
        setOfsharedGossip: new Set(),
      },
    ]);
  });
});

describe("addInitialDriverToBusStop", function () {
  it("should add the initial driver to the right busstop", function () {
    //Arrange
    const busDriver = {
      name: "Driver 0",
      busRoute: [3, 1, 2, 3],
      setOfGossip: new Set(["gossip1"]),
    };
    const busStops = [new BusStop(3)];
    //Act
    addStartingDriverToBusStop(busDriver, busStops);
    //Assert
    expect(busStops).toEqual([
      {
        busStopNumber: 3,
        driversCurrentlyAtStop: new Set([busDriver]),
        setOfsharedGossip: new Set(),
      },
    ]);
  });
});

describe("shareGossipBetweenDriversAtSameStop", function () {
  it("should share gossip between drivers at the same stop", function () {
    //Arrange
    const busStops = [new BusStop(1), new BusStop(2)];
    const busDrivers = [
      new BusDriver("Driver 1", [1, 2, 3], new Set(["gossip1"])),
      new BusDriver("Driver 2", [1, 2, 3], new Set(["gossip2"])),
      new BusDriver("Driver 3", [1, 2, 3], new Set(["gossip3"])),
      new BusDriver("Driver 4", [1, 2, 3], new Set(["gossip4"])),
    ];

    busStops[0].addDriverToStop(busDrivers[0]);
    busStops[0].addDriverToStop(busDrivers[1]);
    busStops[1].addDriverToStop(busDrivers[2]);
    busStops[1].addDriverToStop(busDrivers[3]);

    //Act
    shareGossipBetweenDriversAtSameStop(busStops);
    //Assert
    expect(busDrivers[0].setOfGossip).toEqual(new Set(["gossip1", "gossip2"]));
    expect(busDrivers[1].setOfGossip).toEqual(new Set(["gossip1", "gossip2"]));
    expect(busDrivers[2].setOfGossip).toEqual(new Set(["gossip3", "gossip4"]));
    expect(busDrivers[3].setOfGossip).toEqual(new Set(["gossip3", "gossip4"]));
  });
});

describe("clearBusStopsOfGossip", function () {
  it("should clearBusStopsOfGossip()", function () {
    //Arrange
    const busStops = [new BusStop(1), new BusStop(2)];
    busStops.forEach((busStop) => {
      busStop.setOfsharedGossip.add("gossip1");
      busStop.setOfsharedGossip.add("gossip2");
    });
    //Act
    clearBusStopsOfGossip(busStops);
    //Assert
    expect(busStops[0].setOfsharedGossip).toEqual(new Set());
    expect(busStops[1].setOfsharedGossip).toEqual(new Set());
  });
});

describe("moveAllDriversToTheirNextStop", function () {
  it("should moveAllDriversToTheirNextStop()", function () {
    //Arrange
    const busStops = [
      new BusStop(0),
      new BusStop(1),
      new BusStop(2),
      new BusStop(3),
    ];
    const busDrivers = [
      new BusDriver("Driver 0", [1, 2, 2, 3], new Set(["gossip1"])),
      new BusDriver("Driver 1", [1, 0, 1, 3], new Set(["gossip2"])),
      new BusDriver("Driver 2", [0, 3, 1, 2], new Set(["gossip3"])),
    ];

    busDrivers.forEach((busDriver) => {
      addStartingDriverToBusStop(busDriver, busStops);
    });

    //Act
    moveAllDriversToTheirNextStop(busDrivers, busStops);

    //Assert
    expect(busStops[2].driversCurrentlyAtStop).toEqual(
      new Set([busDrivers[0]])
    );
  });
});

describe("checkIfGossipTransferComplete", function () {

  it('should checkIfGossipTransferComplete between all drivers ', function () {
    //Arrange
    const busDrivers = [
      new BusDriver("Driver 0", [1, 2, 2, 3], new Set(["gossip1"])),
      new BusDriver("Driver 1", [1, 0, 1, 3], new Set(["gossip2"])),
      new BusDriver("Driver 2", [0, 3, 1, 2], new Set(["gossip3"])),
    ];
    busDrivers.forEach((busDriver) => { busDriver.setOfGossip.add("gossip1") });
    busDrivers.forEach((busDriver) => { busDriver.setOfGossip.add("gossip2") });
    busDrivers.forEach((busDriver) => { busDriver.setOfGossip.add("gossip3") });
    //Act
    const result = checkIfGossipTransferComplete(busDrivers);
    //Assert
    expect(result).toEqual(true);

  });

});
