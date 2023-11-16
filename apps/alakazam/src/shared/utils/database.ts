import { edgedb } from "~~/dbschema/edgeql-js/imports";
import e from "~~/dbschema/edgeql-js";

export const database = {
  client: edgedb.createClient(),
  ...e,
}
