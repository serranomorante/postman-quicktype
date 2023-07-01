export type TPostmanWorkspace = {
  id: string;
  name: string;
  type: string;
  visibility: string;
};

export type TPostmanCollection = {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
  isPublic: boolean;
};
