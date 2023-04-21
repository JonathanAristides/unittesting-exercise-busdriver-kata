import BusDriver from "./BusDriver.js";
import * as utils from "./utils.js";

export function findMinimumStops(routesArray, startingGossipForEachDriver) {
  const busDrivers = utils.createNewBusDrivers(
    routesArray,
    startingGossipForEachDriver
  );
  const numberOfCurrentDrivers = busDrivers.length;

  const busStops = utils.createNewBusStops(routesArray);

  busDrivers.forEach((busDriver) =>
    utils.addStartingDriverToBusStop(busDriver, busStops)
  );

  for (let minutes = 0; minutes < 480; minutes++) {
    utils.shareGossipBetweenDriversAtSameStop(busStops);
    // console.log(busDrivers[0].setOfGossip);
    utils.clearBusStopsOfGossip(busStops);

    utils.moveAllDriversToTheirNextStop(busDrivers, busStops);

    utils.checkIfGossipTransferComplete(busStops, numberOfCurrentDrivers);

    console.log(minutes, busDrivers[0].name, busDrivers[0].setOfGossip);
    console.log(minutes, busDrivers[1].name, busDrivers[1].setOfGossip);
    console.log(minutes, busDrivers[2].name, busDrivers[2].setOfGossip);
  }

  return 0;
}

/*
 *
 *
 *
 * */

const routesArray = [
  [1, 2, 2, 3],
  [1, 0, 1, 3],
  [0, 2, 1, 2],
];
const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];

findMinimumStops(routesArray, startingGossip);
