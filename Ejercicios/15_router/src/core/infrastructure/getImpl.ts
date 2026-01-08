import type { GetEventRepository } from "../application/ports";
import type { EventGet } from "../domain/models";
import { httpClient } from "./api";

const url="http://localhost:8080/events/"

export const getRepositoryImpl: GetEventRepository = {
  getEvent: async (id) => {
    const dto = await httpClient.get<EventGet>(
      url+id
    );
    return dto;
  },
  getEventsList: async () => {
    const dto = await httpClient.get<EventGet[]>(
      url
    );
    return dto;
  },
};
