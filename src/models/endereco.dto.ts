import { CidadeDTO } from './cidade.dto';

export interface EnderecoDTO {
  id: String
  logradouro: String
  numero: String
  complemento: String
  bairro: String
  cep: String
  cidade: CidadeDTO
}