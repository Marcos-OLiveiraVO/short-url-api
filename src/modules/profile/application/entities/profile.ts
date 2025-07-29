export interface ProfileProps {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Profile {
  private props: ProfileProps;
  private _id?: number;

  constructor(props: ProfileProps, id?: number) {
    this.props = props;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this.props.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email(): string {
    return this.props.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
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
