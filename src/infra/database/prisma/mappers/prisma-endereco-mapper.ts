import { Endereco } from '@application/entities/Endereco';

export class PrismaEndercoMapper {
  static toPrisma(endereco: Endereco) {
    return {
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      complemento: endereco.complemento,
      cidade: endereco.cidade,
      estado: endereco.estado,
      cep: endereco.cep,
      long: endereco.longitude,
      lat: endereco.latitude,
      lancheId: endereco.lancheId,
    };
  }
}
