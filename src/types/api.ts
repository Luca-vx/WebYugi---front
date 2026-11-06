export interface UserDto {
  id: number;
  name: string;
  email: string;
  dataCadastro: string;
}

export interface LoginRequest {
  EmailOrName: string;
  Password: string;
}

export interface SignupRequest {
  Name: string;
  Email: string;
  Senha: string;
}

export interface CardDto {
  id: number;
  name: string;
  type: string;
  description: string;
  imageUrl?: string | null;
  archetype?: string | null;
  rarity?: string | null;
  attack?: number | null;
  defense?: number | null;
  level?: number | null;
}
