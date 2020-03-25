import { cloneDeep } from "lodash";

export default calculate;
export {
  Title,
  CartItem,
  DiscountSet,
  generateAllDiscountCombinations,
  generateAllDiscountCombinationsByMaxSize,
  generateShoppingCartItems,
  createNextCombination
};

const PRICE = 8;

enum Title {
  HARRY_POTTER_AND_THE_SORCERER_STONE = 1,
  HARRY_POTTER_AND_THE_CHAMBER_OF_SECRETS = 2,
  HARRY_POTTER_AND_THE_PRISONER_OF_AZKABAN = 3,
  HARRY_POTTER_AND_THE_GOBLET_OF_FIRE = 4,
  HARRY_POTTER_AND_THE_ORDER_OF_THE_PHOENIX = 5
}

type CartItem = {
  title: Title;
  quantity: number;
};

type DiscountSet = {
  uniqueTitles: number;
  discount: number;
};

const DISCOUNT_SET: DiscountSet[] = [
  {
    uniqueTitles: 1,
    discount: 0
  },
  {
    uniqueTitles: 2,
    discount: 5
  },
  {
    uniqueTitles: 3,
    discount: 10
  },
  {
    uniqueTitles: 4,
    discount: 20
  },
  {
    uniqueTitles: 5,
    discount: 25
  }
];

function calculate(copies: Title[]): number {
  if (copies.length === 0) return 0;
  const shoppingCartItems = generateShoppingCartItems(copies);
  const combinations = generateAllDiscountCombinations(shoppingCartItems);
  return findBestPrice(combinations);
}

function findBestPrice(combinations: Array<DiscountSet[]>): number {
  let min = Infinity;
  combinations.forEach(comb => {
    const combPrice = comb.reduce(
      (acc, cur) =>
        (acc +=
          cur.uniqueTitles * PRICE -
          (cur.uniqueTitles * PRICE * cur.discount) / 100),
      0
    );
    if (combPrice < min) min = combPrice;
  });
  return min;
}

function generateAllDiscountCombinations(
  shoppingCartItems: CartItem[]
): Array<DiscountSet[]> {
  const combinations: Array<DiscountSet[]> = [];

  for (let i = shoppingCartItems.length; i >= 1; i--) {
    const cloneCart = cloneDeep(shoppingCartItems);
    const combinationsByMaxSize = generateAllDiscountCombinationsByMaxSize(
      cloneCart,
      i
    );
    combinations.push(combinationsByMaxSize);
  }
  return combinations;
}

function generateAllDiscountCombinationsByMaxSize(
  shoppingCartItems: CartItem[],
  maxSize: number
): DiscountSet[] {
  let remainingCartItems = [...shoppingCartItems];
  const discountCombinations: DiscountSet[] = [];

  while (remainingCartItems.length > 0) {
    const combination = createNextCombination(remainingCartItems, maxSize);
    if (combination.discountSet) {
      remainingCartItems = combination.remainingItems;
      discountCombinations.push(combination.discountSet);
    }
  }

  return discountCombinations;
}

function createNextCombination(
  remainingCartItems: CartItem[],
  maxSize: number
): { discountSet: DiscountSet | undefined; remainingItems: CartItem[] } {
  const copies: Title[] = [];
  const clonedCart = [...remainingCartItems];

  for (let clonedItem of clonedCart) {
    copies.push(clonedItem.title);
    if (clonedItem.quantity === 1) {
      remainingCartItems = remainingCartItems.filter(
        item => item.title !== clonedItem.title
      );
    } else {
      clonedItem.quantity--;
    }
    if (copies.length === maxSize) break;
  }

  return {
    discountSet: DISCOUNT_SET.find(set => set.uniqueTitles === copies.length),
    remainingItems: remainingCartItems
  };
}

function generateShoppingCartItems(copies: Title[]): CartItem[] {
  const shoppingCartItems: CartItem[] = [];
  copies.forEach(copy => {
    const existingItem = shoppingCartItems.find(item => item.title === copy);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      shoppingCartItems.push({ title: copy, quantity: 1 });
    }
  });
  return shoppingCartItems;
}
