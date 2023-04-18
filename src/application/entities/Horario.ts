import { randomUUID } from 'crypto';

export interface HorarioProps {
  diaSemana: string;
  disponivel: boolean;
  horaAbre: Date;
  horaFecha: Date;

  lancheId: string;
}

export class Horario {
  private _id: string;
  private props: HorarioProps;

  constructor(props: HorarioProps) {
    this._id = randomUUID();
    this.props = props;
  }

  public get id(): string {
    return this._id;
  }

  public set diaSemana(dia: string) {
    this.props.diaSemana = dia;
  }

  public get diaSemana(): string {
    return this.props.diaSemana;
  }

  public set disponivel(disponivel: boolean) {
    this.props.disponivel = disponivel;
  }

  public get disponivel(): boolean {
    return this.props.disponivel;
  }

  public set aberto(aberto: Date) {
    this.props.horaAbre = aberto;
  }

  public get aberto(): Date {
    return this.props.horaAbre;
  }

  public set fechado(fechado: Date) {
    this.props.horaFecha = fechado;
  }

  public get fechado(): Date {
    return this.props.horaFecha;
  }
}
