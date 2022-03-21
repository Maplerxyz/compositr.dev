import { ImageMetaData } from "../../../../pages/api/v1/img/meta/[resourceID]";
import { ResourceID } from "../../../../typings/api/v1/ResourceID";

export default async function getMetaData(
  resourceID: ResourceID
): Promise<ImageMetaData> {
  const data = await (await fetch(`/api/v1/img/meta/${resourceID}`)).json();
  return data.data;
}
