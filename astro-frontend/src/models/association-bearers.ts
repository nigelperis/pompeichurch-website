import type { Locale } from '~/enums/locale';

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

export interface  AssociationOfficeBearers {
  id: number;
  documentId: string;
  svpPresident: string;
  svpSecretary: string;
  svpGroupPicture: AssociationMedia;
  pycAnimator: string;
  pycPresident: string;
  pycSecretary: string;
  pycGroupPicture: AssociationMedia;
  altarServersAnimators: string;
  altarServersPresident: string;
  altarServersSecretary: string;
  altarServersGroupPicture: AssociationMedia;
  catholicSabhaPresident: string;
  catholicSabhaSecretary: string;
  catholicSabhaGroupPicture: AssociationMedia;
  ycsAnimators: string;
  ycsPresident: string;
  ycsSecretary: string;
  ycsGroupPicture: AssociationMedia;
  secularFransiscanPresident: string;
  secularFransiscanSecretary: string;
  secularFransiscanGroupPicture: AssociationMedia;
  catechismCoordinator: string;
  catechismGroupPicture: AssociationMedia;
  smallChristianCommunityConvenor: string;
  smallChristianCommunityGroupImage: AssociationMedia;
  choirMaster: string;
  choirCoordinator: string;
  choirGroupPicture: AssociationMedia;
  womensForumPresident: string;
  womensForumSecretary: string;
  womensForumGroupImage: AssociationMedia;
  clcPresident: string;
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