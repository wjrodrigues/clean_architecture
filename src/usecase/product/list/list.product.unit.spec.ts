import ListProductUseCase from "./list.product.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  };
};

describe("Unit test for listing product use case", () => {
  it("should list a products", async () => {
    const products = [{
      id: "123",
      name: "Product 1",
      price: 120
    },
    {
      id: "123",
      name: "Product 1",
      price: 120
    }]

    const repository = MockRepository();
    repository.findAll.mockImplementation(() => products)

    const useCase = new ListProductUseCase(repository);
    const output = await useCase.execute();

    expect(output.products.length).toBe(2);

    expect(output.products.at(0).id).toBe(products.at(0).id);
    expect(output.products.at(0).name).toBe(products.at(0).name);
    expect(output.products.at(0).price).toBe(products.at(0).price);

    expect(output.products.at(1).id).toBe(products.at(1).id);
    expect(output.products.at(1).name).toBe(products.at(1).name);
    expect(output.products.at(1).price).toBe(products.at(1).price);
  });
});
