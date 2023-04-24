import * as utils from "./utils.js";

export function findMinimumStops(routesArray, startingGossipForEachDriver) {
  const busDrivers = utils.createNewBusDrivers(
    routesArray,
    startingGossipForEachDriver
  );

  const busStops = utils.createNewBusStops(routesArray);

  busDrivers.forEach((busDriver) =>
    utils.addStartingDriverToBusStop(busDriver, busStops)
  );

  for (let minutes = 0; minutes < 480; minutes++) {
    utils.shareGossipBetweenDriversAtSameStop(busStops);
    utils.clearBusStopsOfGossip(busStops);
    utils.moveAllDriversToTheirNextStop(busDrivers, busStops);
    utils.checkIfGossipTransferComplete(busDrivers);

    if (utils.checkIfGossipTransferComplete(busDrivers)) {
      return "Gossip transfer complete after " + minutes + " stops!";
    }

    if (minutes === 479) {
      return "Gossip transfer incomplete after 480 minutes!";
    }
  }
}

const { routesArray, startingGossipForEachDriver } =
  utils.createStartingConditions(10);

const result = findMinimumStops(routesArray, startingGossipForEachDriver);
console.log(routesArray);
console.log(startingGossipForEachDriver);
console.log(result);

// const routesArray = [
//   [3, 1, 2, 3],
//   [3, 2, 3, 1],
//   [4, 2, 3, 4, 5],
// ];
//
// const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];
