export class Article {
  id: string;
  title: string = '';
  slug: string = '';
  heroImage: any = new HeroImage();
  description: string = '';
  body: string = '';
  author: string = '';
  publishDate: Date = null;
  tags: Array<string> = [];
}

export class HeroImage {
  description: string = '';
  fields: HeroImageFields = new HeroImageFields();
}

export class HeroImageFields {
  path: string = '';
  slug: any = '';
  file: HeroImageFile = new HeroImageFile();
}

export class HeroImageFile {
  fileName: string = '';
  url: string = '';
}
