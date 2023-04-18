import { DayjsDateProviderMock } from '@shared/providers/DateProvider/mock/DayjsDateProvider.mock';
import { HorarioRepositoryInMemory } from '../../repositories/in-memory/horarioRepositoryInMemory';
import { CreateHorarioService, IHorarioRequest } from './createHorario';

describe('[CreateHorarioService]', () => {
  let horarioRepository: HorarioRepositoryInMemory;
  let createHorarioService: CreateHorarioService;
  let dateProvider: DayjsDateProviderMock;

  beforeEach(() => {
    horarioRepository = new HorarioRepositoryInMemory();
    dateProvider = new DayjsDateProviderMock();
    createHorarioService = new CreateHorarioService(
      horarioRepository,
      dateProvider,
    );
  });

  it('should be able to create a new Hours Work', async () => {
    const HoursWork: IHorarioRequest[] = [
      {
        diaSemana: 'SEGUNDA_FEIRA',
        disponivel: true,
        horaAbre: '18:30',
        horaFecha: '23:00',
        lancheId: '12345',
      },
    ];
    await createHorarioService.execute(HoursWork);

    console.log(horarioRepository.repository);
    expect(horarioRepository.repository).toHaveLength(1);
    expect(horarioRepository.repository[0]).toHaveProperty('id');
  });
});
