describe("WavePortal", () => {
  before(async () => {});

  it("Should return newly created wave", async function () {
    const Portal = await ethers.getContractFactory("TodoList");
    const portal = await Portal.deploy();
    await portal.deployed();

    expect(items.length).to.equal(1);
  });
});
