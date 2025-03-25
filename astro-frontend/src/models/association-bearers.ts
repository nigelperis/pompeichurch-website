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

interface Media {
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
  svpPresident: string;
  svpSecretary: string;
  svpGroupPicture: Media;
  pycAnimator: string;
  pycPresident: string;
  pycSecretary: string;
  pycGroupPicture: Media;
  altarServersAnimators: string;
  altarServersPresident: string;
  altarServersSecretary: string;
  altarServersGroupPicture: Media;
  catholicSabhaPresident: string;
  catholicSabhaSecretary: string;
  catholicSabhaGroupPicture: Media;
  ycsAnimators: string;
  ycsPresident: string;
  ycsSecretary: string;
  ycsGroupPicture: Media;
  secularFransiscanPresident: string;
  secularFransiscanSecretary: string;
  secularFransiscanGroupPicture: Media;
  catechismCoordinator: string;
  catechismGroupPicture: Media;
  smallChristianCommunityConvenor: string;
  smallChristianCommunityGroupImage: Media;
  choirMaster: string;
  choirCoordinator: string;
  choirGroupPicture: Media;
  womensForumPresident: string;
  womensForumSecretary: string;
  womensForumGroupImage: Media;
  clcPresident: string;
  clcSecretary: string;
  clcGroupImage: Media;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: Locale;
}

export interface AssociationOfficeBearersData {
  data: AssociationOfficeBearers;
  meta: Record<string, unknown>;
}