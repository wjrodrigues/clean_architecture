import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test find product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    const newProduct = {
      id: "123",
      name: "Product 1",
      price: 100,
      type: "a"
    }

    const createResponse = await (new CreateProductUseCase(productRepository)).execute(newProduct)

    const input = {
      id: createResponse.id,
    };

    const findResponse = await usecase.execute(input);
    expect(createResponse).toEqual(findResponse);
  });

  it("should product not found", async () => {
    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    const input = {
      id: "123"
    };

    expect(async () => { await usecase.execute(input) }).rejects.toThrow();
  });
});
