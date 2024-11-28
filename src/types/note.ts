// export interface Note {
//   id: string;
//   title: string;
//   content: string;
//   summary?: string;
//   createdAt: string;
//   tags?: Tag[];
//   isNew?: boolean;
// }

// export interface Tag {
//   id: string;
//   name: string;
// }

// Update the Note and Tag types to match Prisma schema
export type Tag = {
  id: string; // We'll convert BigInt to string when sending from API
  name: string;
};

export type Note = {
  id: string; // We'll convert BigInt to string when sending from API
  title: string;
  content: string;
  summary?: string | null;
  tags?: Tag[];
  createdAt: string; // ISO string from DateTime
  isNew?: boolean;
};
