// foodRepository.ts

import type {
  EventPatch,
  EventPost,
  getEventResponse,
  getEventsResponse,
} from "../domain/models";

export interface GetEventRepository {
  getEvent: (id: string) => Promise<getEventResponse>;
  getEventsList: () => Promise<getEventsResponse>;
}

export interface PostEventRepository {
  postEvent: (event: EventPost) => Promise<void>;
}

export interface PatchEventRepository {
  patchEvent: (id: string, event: EventPatch) => Promise<void>;
}

export interface DeleteEventRepository {
  deleteEvent: (id: string) => Promise<void>;
}
