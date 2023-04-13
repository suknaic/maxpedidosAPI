import { Module } from '@nestjs/common';
import { databaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
@Module({
  imports: [HttpModule, databaseModule],
})
export class AppModule {}
