export interface User {
  id: number;
  email: string;
  password: string; // encrypted
  public_ssh_key: string;
}

export interface mongoDbModel {
  uuid: string;
  user: object;
  // keep user's ssh keys well protected. Check vault encryption
}
