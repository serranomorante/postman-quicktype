export type TPostmanWorkspace = {
  id: string;
  name: string;
  type: string;
  visibility: string;
};

export type TPostmanCollections = {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  uid: string;
  isPublic: boolean;
};

export type TPostmanCollection = {
  info: {
    _postman_id: string;
    name: string;
    schema: string;
    updatedAt: string;
    uid: string;
  };
  item: TPostmanItem[];
}

export type TPostmanItem = {
  name: string;
  item: TPostmanItem[];
  request: {
    method: string;
    header: unknown[];
    url: unknown;
  };
  response: TPostmanResponse[];
}

export type TPostmanResponse = {
  id: string;
  name: string;
  status: string;
  code: number;
  _postman_previewlanguage: string;
  header: unknown[];
  cookie: unknown[];
  body: string;
}

