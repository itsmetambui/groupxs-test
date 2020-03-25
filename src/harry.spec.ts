import calculate, { Title } from "./harry";

const generateCartItems = (
  quantities: [number, number, number, number, number]
): Title[] => {
  const titles = [
    Title.HARRY_POTTER_AND_THE_CHAMBER_OF_SECRETS,
    Title.HARRY_POTTER_AND_THE_GOBLET_OF_FIRE,
    Title.HARRY_POTTER_AND_THE_ORDER_OF_THE_PHOENIX,
    Title.HARRY_POTTER_AND_THE_PRISONER_OF_AZKABAN,
    Title.HARRY_POTTER_AND_THE_SORCERER_STONE
  ];

  const cart: Title[] = [];
  quantities.forEach((quantity, index) => {
    for (let i = 0; i < quantity; i++) {
      cart.push(titles[index]);
    }
  });
  return cart;
};

describe("generateCartItems", () => {
  expect(generateCartItems([1, 2, 1, 1, 1])).toEqual([
    Title.HARRY_POTTER_AND_THE_CHAMBER_OF_SECRETS,
    Title.HARRY_POTTER_AND_THE_GOBLET_OF_FIRE,
    Title.HARRY_POTTER_AND_THE_GOBLET_OF_FIRE,
    Title.HARRY_POTTER_AND_THE_ORDER_OF_THE_PHOENIX,
    Title.HARRY_POTTER_AND_THE_PRISONER_OF_AZKABAN,
    Title.HARRY_POTTER_AND_THE_SORCERER_STONE
  ]);
});

describe("giving as big a discount as possible", () => {
  it("no pay for 0 book", () => {
    expect(calculate([])).toEqual(0);
  });

  it("normal price for 1 book", () => {
    expect(calculate(generateCartItems([1, 0, 0, 0, 0]))).toEqual(8);
  });

  it("normal price for 2 same books", () => {
    expect(calculate(generateCartItems([2, 0, 0, 0, 0]))).toEqual(16);
  });

  it("discount 5% for 2 different books", () => {
    expect(calculate(generateCartItems([1, 1, 0, 0, 0]))).toEqual(15.2);
  });

  it("discount 10% for 3 different books", () => {
    expect(calculate(generateCartItems([1, 1, 1, 0, 0]))).toEqual(21.6);
  });

  it("discount 20% for 4 different books", () => {
    expect(calculate(generateCartItems([1, 1, 1, 1, 0]))).toEqual(25.6);
  });

  it("discount 25% for 5 different books", () => {
    expect(calculate(generateCartItems([1, 1, 1, 1, 1]))).toEqual(30);
  });

  it("discount 5% for 2 books and normal for 1 book", () => {
    expect(calculate(generateCartItems([2, 1, 0, 0, 0]))).toEqual(23.2);
  });

  it("discount 5% twice for 4 books", () => {
    expect(calculate(generateCartItems([2, 2, 0, 0, 0]))).toEqual(30.4);
  });

  it("discount 10% for 3 books and normal for 1 book", () => {
    expect(calculate(generateCartItems([2, 1, 1, 0, 0]))).toEqual(29.6);
  });

  it("discount 10% for 3 books and 5% for 2 book", () => {
    expect(calculate(generateCartItems([2, 2, 1, 0, 0]))).toEqual(36.8);
  });

  it("discount 10% for 3 books and normal for 2 book", () => {
    expect(calculate(generateCartItems([3, 1, 1, 0, 0]))).toEqual(37.6);
  });

  it("discount 20% twice for 8 different books", () => {
    expect(calculate(generateCartItems([2, 2, 2, 1, 1]))).toEqual(51.2);
  });
});
