import FindProductUseCase from "./find.product.usecase";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test find product use case", () => {
  it("should returns a product", async () => {
    const productRepository = MockRepository();
    const expected = { id: "123", name: "Product A", price: 10.00 } as OutputFindProductDto
    productRepository.find.mockImplementation(() => expected)

    const productFindUseCase = new FindProductUseCase(productRepository);
    const input = { id: "123" } as InputFindProductDto
    const output = await productFindUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: expected.name,
      price: expected.price
    });
  });

  it("should not find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const usecase = new FindProductUseCase(productRepository);

    const input = { id: "123" } as InputFindProductDto;

    expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
