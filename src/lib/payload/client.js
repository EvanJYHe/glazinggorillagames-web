import { getPayload } from "payload";
import config from "@payload-config";

let payloadPromise;

export function getPayloadClient() {
  if (!payloadPromise) {
    payloadPromise = getPayload({ config });
  }

  return payloadPromise;
}
