export interface ShortenerProps {
  profileId?: number;
  name?: string;
  originalUrl: string;
  slug: string;
  hits?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Shortener {
  _id?: number;
  props: ShortenerProps;

  constructor(props: ShortenerProps, id?: number) {
    this.props = props;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get profileId(): number | undefined {
    return this.props.profileId;
  }

  public set profileId(profileId: number) {
    this.props.profileId = profileId;
  }

  public get name(): string | undefined {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get originalUrl(): string {
    return this.props.originalUrl;
  }

  public set originalUrl(originalUrl: string) {
    this.props.originalUrl = originalUrl;
  }

  public get slug(): string {
    return this.props.slug;
  }

  public set slug(slug: string) {
    this.props.slug = slug;
  }

  public get hits(): number | undefined {
    return this.props.hits;
  }

  public set hits(hits: number | undefined) {
    this.props.hits = hits;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  public get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  public set deletedAt(deletedAt: Date) {
    this.props.deletedAt = deletedAt;
  }
}
