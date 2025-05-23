import { slugMappings } from "~/constants/association-slug-mappings";
import { getPlaceholderImage } from "./get-placeholder-image";
import type { AssociationOfficeBearers } from "~/models/association-bearers";

export function getGroupImage(
  associationDetails: AssociationOfficeBearers | undefined,
  slug: keyof typeof slugMappings,
): string {
  if (!associationDetails) return getPlaceholderImage();

  const groupPictureField = slugMappings[slug]
    ?.groupPicture as keyof AssociationOfficeBearers;

  const image = associationDetails[groupPictureField];

  if (typeof image === "object" && image !== null && "url" in image) {
    return new URL(image.url, import.meta.env.PUBLIC_STRAPI_URL).toString();
  }

  return getPlaceholderImage();
}
