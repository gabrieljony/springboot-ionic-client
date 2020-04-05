import { logging } from 'protractor';

export interface ClienteDTO {
  id: string;
  nome: string;
  email: string;
  imageUrl?: string;
  dateImageUrl: number;
}