import { Lanche } from '@prisma/client';

export class PrismaLancheMapper {
  static toPrisma(lanche: Lanche) {
    return {
      id: lanche.id,
      logo: lanche.logo,
      nome: lanche.nome,
      contato: lanche.contato,
      usuarioId: lanche.usuarioId,
    };
  }
}
