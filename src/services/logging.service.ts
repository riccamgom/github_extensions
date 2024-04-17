import { connect } from '../database/connection.service';
import { Logs } from '../database/models/logs.model';
import { LogDto } from '../dtos/log.dto';

async function writeLog(logEntry: LogDto) {
  const db = await connect(); // Conexión a la base de datos
  const logs = new Logs(db);
  await logs.writeLogs(logEntry);
}

export { writeLog };
