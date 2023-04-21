import { Lanche } from 'src/application/entities/Lanche';

export class PrismaLancheMapper {
  static toPrisma(lanche: Lanche) {
    return {
      id: lanche.id,
      logo: lanche.logo,
      nome: lanche.nome,
      contato: lanche.contato,
      horaAbre: lanche.horaAbre,
      horaFecha: lanche.horaFecha,
      diasAbre: lanche.diasAbre,
      usuarioId: lanche.usuarioId,
    };
  }
}
