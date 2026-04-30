import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      return new Product("123", "Product 1", 100)
    })
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = { id: "123", name: "Product updated", price: 200 }
    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throws not found", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => { throw new Error("Not found") })

    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const input = { id: "123", name: "Product updated", price: 200 }
    expect(async () => {
      await productUpdateUseCase.execute(input)
    }).rejects.toThrow("Not found");
  });
});
