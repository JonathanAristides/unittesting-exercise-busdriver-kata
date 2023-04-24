import BusDriver from "./BusDriver.js";
import BusStop from "./BusStop.js";

export function createNewBusDrivers(routesArray, startingGossipForEachDriver) {
  return startingGossipForEachDriver.map((gossip, index) => {
    return new BusDriver(`Driver ${index}`, routesArray[index], gossip);
  });
}

export function createNewBusStops(routesArray) {
  const flatRoutesArray = routesArray.flat();
  const uniqueBusStops = [...new Set(flatRoutesArray)];

  return uniqueBusStops
    .map((busStopNumber) => {
      return new BusStop(busStopNumber);
    })
    .sort((a, b) => a.busStopNumber - b.busStopNumber);
}

export function addStartingDriverToBusStop(busDriver, busStops) {
  const startingBusStop = busStops.find(
    (busStop) => busStop.busStopNumber === busDriver.busRoute[0]
  );
  busDriver.setStopIndex(0);
  startingBusStop.addDriverToStop(busDriver);
}

export function shareGossipBetweenDriversAtSameStop(busStops) {
  busStops.forEach((busStop) => {
    busStop.shareGossip();
  });
}

export function clearBusStopsOfGossip(busStops) {
  busStops.forEach((busStop) => {
    busStop.clearCurrentGossipAtStop();
  });
}

export function moveAllDriversToTheirNextStop(busDrivers, busStops) {
  busStops.forEach((busStop) => {
    busStop.removeDriversFromStop();
  });

  busDrivers.forEach((busDriver) => {
    busDriver.moveDriverToNextStop();

    const nextBusStop = busStops.find(
      (busStop) =>
        busStop.busStopNumber === busDriver.busRoute[busDriver.stopIndex]
    );

    nextBusStop.addDriverToStop(busDriver);
  });
}

export function checkIfGossipTransferComplete(busDrivers) {
  const gossipTransferComplete = busDrivers.every(
    (busDriver) => busDriver.setOfGossip.size === busDrivers.length
  );

  return !!gossipTransferComplete;
}

export function createStartingConditions(numberOfRoutesAndGossips) {
  const routesArray = [];
  const startingGossipForEachDriver = [];

  try {
    if (numberOfRoutesAndGossips <= 0) {
      throw new Error("Error: Please enter a positive number");
    }
    if (typeof numberOfRoutesAndGossips !== "number") {
      throw new Error("Error: Please enter a number");
    }

    for (let i = 0; i < numberOfRoutesAndGossips; i++) {
      const driverRouteArray = [];

      const numberOfStopsInRoute = Math.ceil(Math.random() * 10);

      for (let j = 0; j < numberOfStopsInRoute; j++) {
        driverRouteArray.push(Math.floor(Math.random() * 10));
      }

      routesArray.push(driverRouteArray);
      startingGossipForEachDriver.push([`gossip${i}`]);
    }
  } catch (error) {
    return error.message;
  }

  return { routesArray, startingGossipForEachDriver };
}
