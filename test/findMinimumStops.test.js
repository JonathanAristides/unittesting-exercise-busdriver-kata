import { findMinimumStops } from "../src/findMinimumStops";

describe("findMinimumStops function", () => {
  it("should return the minimum number of stops required to share all the gossip", function () {
    //Arrange
    const routesArray = [
      [1, 3, 2, 3],
      [1, 0, 1, 3],
      [0, 2, 1, 3],
    ];
    const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];
    //Act
    const result = findMinimumStops(routesArray, startingGossip);
    //Assert
    expect(result).toEqual("Gossip transfer complete after 3 stops!");
  });

  it('should return "Gossip transfer incomplete after 480 minutes!" if the time runs out before then', function () {
    //Arrange
    const routesArray = [
      [1, 3, 2, 1],
      [3, 0, 1, 3],
      [0, 2, 1, 2],
    ];
    const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];
    //Act
    const result = findMinimumStops(routesArray, startingGossip);
    //Assert
    expect(result).toEqual("Gossip transfer incomplete after 480 minutes!");
  });
});
