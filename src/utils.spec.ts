import {
  generateShoppingCartItems,
  generateAllDiscountCombinations,
  generateAllDiscountCombinationsByMaxSize,
  createNextCombination,
  Title
} from "./harry";

const sampleShoppingCart = [
  Title.HARRY_POTTER_AND_THE_CHAMBER_OF_SECRETS,
  Title.HARRY_POTTER_AND_THE_CHAMBER_OF_SECRETS,
  Title.HARRY_POTTER_AND_THE_GOBLET_OF_FIRE
];

describe("generateShoppingCartItems", () => {
  it("should normalize shopping cart", () => {
    const result = generateShoppingCartItems(sampleShoppingCart);
    expect(result).toEqual([
      {
        title: Title.HARRY_POTTER_AND_THE_CHAMBER_OF_SECRETS,
        quantity: 2
      },
      {
        title: Title.HARRY_POTTER_AND_THE_GOBLET_OF_FIRE,
        quantity: 1
      }
    ]);
  });
});

describe("createNextCombination", () => {
  it("should return next discount combination by size 1", () => {
    const cartItems = generateShoppingCartItems(sampleShoppingCart);
    const result = createNextCombination(cartItems, 1);
    expect(result.discountSet).toEqual({
      uniqueTitles: 1,
      discount: 0
    });
    expect(result.remainingItems).toEqual(
      generateShoppingCartItems([
        Title.HARRY_POTTER_AND_THE_CHAMBER_OF_SECRETS,
        Title.HARRY_POTTER_AND_THE_GOBLET_OF_FIRE
      ])
    );
  });
  it("should return next discount combination by size 2", () => {
    const cartItems = generateShoppingCartItems(sampleShoppingCart);
    const result = createNextCombination(cartItems, 2);
    expect(result.discountSet).toEqual({
      uniqueTitles: 2,
      discount: 5
    });
    expect(result.remainingItems).toEqual(
      generateShoppingCartItems([Title.HARRY_POTTER_AND_THE_CHAMBER_OF_SECRETS])
    );
  });
});

describe("generateAllDiscountCombinationsByMaxSize", () => {
  it("should return 3 discounts by size 1", () => {
    const cartItems = generateShoppingCartItems(sampleShoppingCart);
    const result = generateAllDiscountCombinationsByMaxSize(cartItems, 1);
    expect(result).toEqual([
      { uniqueTitles: 1, discount: 0 },
      { uniqueTitles: 1, discount: 0 },
      { uniqueTitles: 1, discount: 0 }
    ]);
  });

  it("should return 2 discount by size 2", () => {
    const cartItems = generateShoppingCartItems(sampleShoppingCart);
    const result = generateAllDiscountCombinationsByMaxSize(cartItems, 2);
    expect(result).toEqual([
      { uniqueTitles: 2, discount: 5 },
      { uniqueTitles: 1, discount: 0 }
    ]);
  });
});

describe("generateAllDiscountCombinations", () => {
  it("should return all possible discount combinations by size 1", () => {
    const cartItems = generateShoppingCartItems(sampleShoppingCart);
    const result = generateAllDiscountCombinations(cartItems);
    expect(result).toEqual([
      [
        { uniqueTitles: 2, discount: 5 },
        { uniqueTitles: 1, discount: 0 }
      ],
      [
        { uniqueTitles: 1, discount: 0 },
        { uniqueTitles: 1, discount: 0 },
        { uniqueTitles: 1, discount: 0 }
      ]
    ]);
  });
});
