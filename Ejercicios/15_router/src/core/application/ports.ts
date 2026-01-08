// foodRepository.ts

import type { EventGet, EventPatch, EventPost } from "../domain/models";

export interface GetEventRepository {
  getEvent: (id:string) => Promise<EventGet>;
  getEventsList: () => Promise<EventGet[]>;
}

export interface PostEventRepository {
  postEvent: (event: EventPost) => Promise<EventGet>;
}

export interface PatchEventRepository {
  patchEvent: (id:string, event:EventPatch)=>Promise<EventGet>;
}

export interface DeleteEventRepository {
  deleteEvent: (id:string)=>Promise<void>
}

