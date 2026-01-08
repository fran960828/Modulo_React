export interface EventGet {
  id:string,
  title:string,
  date:string,
  image:string,
  description:string
}

export interface EventPost {
  title:string,
  date:string,
  image:string,
  description:string
}

export type EventPatch = Partial<EventPost>
