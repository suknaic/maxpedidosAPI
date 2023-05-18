import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CardapioRepository } from '@application/repositories/CardapioRepository';
import { LancheRepository } from '@application/repositories/lancheRepository';
import { Cardapio } from '@application/entities/Cardapio';

@Injectable()
export class CreateCardapioService {
  constructor(
    private cardapioRepository: CardapioRepository,
    private lancheRepository: LancheRepository,
  ) {}

  async execute(lancheId: string): Promise<void> {
    const lancheExistis = await this.lancheRepository.findById(lancheId);

    if (!lancheExistis) {
      throw new HttpException('lanche not existis', HttpStatus.BAD_REQUEST);
    }

    const cardapio = new Cardapio({
      lancheId,
    });

    await this.cardapioRepository.create(cardapio);
  }
}
