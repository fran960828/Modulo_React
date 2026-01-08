import { type PostEventRepository } from "../application/ports";
import { httpClient } from "./api";

export const postEventImpl: PostEventRepository = {
  postEvent: async (event) => {
    await httpClient.post(
      "http://localhost:8080/events/",
      event
    );
  },
};
