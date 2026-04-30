import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test update product use case", () => {
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

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const usecaseUpdate = new UpdateProductUseCase(productRepository);
    const product1 = {
      id: "",
      name: "Product 1",
      price: 100,
      type: "a"
    }

    const useCaseCreate = new CreateProductUseCase(productRepository)
    const createResponse1 = await useCaseCreate.execute(product1)

    const inputUpdate = {
      id: createResponse1.id,
      name: "Product updated",
      price: 200
    }
    const updateResponse = await usecaseUpdate.execute(inputUpdate);
    expect(updateResponse).toEqual(inputUpdate)
  });

  it("should returns not found", async () => {
    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = { id: "123", name: "Product 1", price: 50 }

    expect(async () => await usecase.execute(input)).rejects.toThrow()
  });
});
