import { findMinimumStops } from "../src/findMinimumStops";

describe("findMinimumStops function", () => {
  it("should return the minimum number of stops required to share all the gossip", function () {
    //Arrange
    const routesArray = [
      [3, 1, 2, 3],
      [3, 2, 3, 1],
      [4, 2, 3, 4, 5],
    ];
    const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];
    //Act
    const result = findMinimumStops(routesArray, startingGossip);
    //Assert
    expect(result).toEqual("Gossip transfer complete after 4 stops!");
  });

  it('should return "Gossip transfer incomplete after 480 minutes!" if the time runs out before then', function () {
    //Arrange
    const routesArray = [
      [2, 1, 2],
      [5, 2, 8],
    ];

    // const routesArray = [
    //   [2, 1, 2],
    //   [5, 2, 8, 3],
    //   [0, 2, 1, 2],
    // ];

    // const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];
    const startingGossip = [["gossip1"], ["gossip2"]];
    //Act
    const result = findMinimumStops(routesArray, startingGossip);
    //Assert
    expect(result).toEqual("Gossip transfer incomplete after 480 minutes!");
  });
});
