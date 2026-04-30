import { Sequelize } from "sequelize-typescript";
import ListProductUseCase from "./list.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test list products use case", () => {
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

  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);
    const product1 = {
      id: "",
      name: "Product 1",
      price: 100,
      type: "a"
    }

    const product2 = {
      id: "",
      name: "Product 2",
      price: 100,
      type: "b"
    }

    const useCaseCreate = new CreateProductUseCase(productRepository)
    const createResponse1 = await useCaseCreate.execute(product1)
    const createResponse2 = await useCaseCreate.execute(product2)

    const listResponse = await usecase.execute();
    expect(listResponse).toEqual({
      products: [
        { id: createResponse1.id, name: product1.name, price: 100 },
        { id: createResponse2.id, name: product2.name, price: 200 },
      ]
    })
  });

  it("should returns empty list", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const response = await usecase.execute()
    expect(response).toEqual({ products: [] })
  });
});
