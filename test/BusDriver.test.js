import BusDriver from "../src/BusDriver";

describe("BusDriver class", () => {
  it("should moveDriverToNextStop()", function () {
    //Arrange
    const busDriver = new BusDriver("Bob", [1, 2, 3], ["gossip1"]);
    busDriver.setStopIndex(0);

    //Act
    busDriver.moveDriverToNextStop();
    busDriver.moveDriverToNextStop();

    //Assert
    expect(busDriver.stopIndex).toEqual(2);
  });

  it("should moveDriverToNextStop() and wrap when it its at the end of the route", function () {
    //Arrange
    const busDriver = new BusDriver("Bob", [1, 2, 3], ["gossip1"]);
    busDriver.setStopIndex(0);

    //Act
    busDriver.moveDriverToNextStop();
    busDriver.moveDriverToNextStop();
    busDriver.moveDriverToNextStop();
    busDriver.moveDriverToNextStop();

    //Assert
    expect(busDriver.stopIndex).toEqual(1);
  });
});
