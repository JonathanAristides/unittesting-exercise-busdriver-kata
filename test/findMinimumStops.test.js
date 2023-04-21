import { findMinimumStops } from "../src/findMinimumStops";

describe("findMinimumStops function", () => {
  it("should return the minimum number of stops required to share all the gossip", function () {
    //Arrange
    const routesArray = [
      [1, 0, 2, 3],
      [0, 1, 2, 3],
      [3, 2, 1, 2],
    ];
    const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];
    //Act
    const result = findMinimumStops(routesArray, startingGossip);
    //Assert
    expect(result).toEqual(2);
  });

  it('should return "not all gossip has been shared" if the time runs out before then', function () {
    //Arrange
    const routesArray = [
      [1, 0, 2, 3],
      [0, 1, 2, 3],
      [3, 2, 1, 2],
    ];
    const startingGossip = [["gossip1"], ["gossip2"], ["gossip3"]];
    //Act
    const result = findMinimumStops(routesArray, startingGossip);
    //Assert
    expect(result).toEqual("not all gossip has been shared");
  });
});
