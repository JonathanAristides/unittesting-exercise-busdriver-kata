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


const routesArray = [
  [1, 3, 2, 1],
  [3, 0, 1, 3],
  [0, 2, 1, 2],
];
const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];

const result = findMinimumStops(routesArray, startingGossip);

console.log(result);
