import type { Locale } from "~/enums/locale";

interface MediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface AssociationMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: {
    large?: MediaFormat;
    small?: MediaFormat;
    medium?: MediaFormat;
    thumbnail?: MediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface AssociationOfficeBearers {
  id: number;
  documentId: string;
  svpPresidentMale: string;
  svpPresidentFemale: string;
  svpSecretary: string;
  svpGroupPicture: AssociationMedia;
  pycAnimatorMale: string;
  pycAnimatorFemale: string;
  pycPresidentMale: string;
  pycPresidentFemale: string;
  pycSecretary: string;
  pycGroupPicture: AssociationMedia;
  altarServersAnimators: string;
  altarServersAnimatorMale: string;
  altarServersAnimatorFemale: string;
  altarServersPrefect: string;
  altarServersSecretary: string;
  altarServersGroupPicture: AssociationMedia;
  catholicSabhaPresidentMale: string;
  catholicSabhaPresidentFemale: string;
  catholicSabhaSecretary: string;
  catholicSabhaGroupPicture: AssociationMedia;
  ycsAnimators: string;
  ycsAnimatorMale: string;
  ycsAnimatorFemale: string;
  ycsPresidentMale: string;
  ycsPresidentFemale: string;
  ycsSecretary: string;
  ycsGroupPicture: AssociationMedia;
  secularFransiscanPresidentMale: string;
  secularFransiscanPresidentFemale: string;
  secularFransiscanSecretary: string;
  secularFransiscanGroupPicture: AssociationMedia;
  catechismCoordinatorMale: string;
  catechismCoordinatorFemale: string;
  catechismGroupPicture: AssociationMedia;
  smallChristianCommunityConvenorMale: string;
  smallChristianCommunityConvenorFemale: string;
  smallChristianCommunityGroupImage: AssociationMedia;
  choirMaster: string;
  choirCoordinatorMale: string;
  choirCoordinatorFemale: string;
  choirGroupPicture: AssociationMedia;
  womensForumPresident: string;
  womensForumSecretary: string;
  womensForumGroupImage: AssociationMedia;
  clcPresidentMale: string;
  clcPresidentFemale: string;
  clcSecretary: string;
  clcGroupImage: AssociationMedia;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: Locale;
}

export interface AssociationOfficeBearersData {
  data: AssociationOfficeBearers;
  meta: Record<string, unknown>;
}
