import type { MenuRepository } from "../application/ports";
import type { AvailableMeals } from "../domain/models";
import { httpClient } from "./api";

export const menuRepositoryImpl: MenuRepository = {
  getMenu: async () => {
    const dto = await httpClient.get<AvailableMeals[]>(
      "http://localhost:3000/meals"
    );
    return dto;
  },
};
