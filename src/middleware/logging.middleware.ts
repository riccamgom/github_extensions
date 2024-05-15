import { Request, Response, NextFunction } from 'express';
import { writeLog } from '../services/logging.service';

export function logMiddleware(req: Request, res: Response, next: NextFunction): void {
    // Aquí puedes personalizar qué información deseas registrar
    const { method, path, params, query } = req;
    const logMessage = `Accessed ${method} ${path} with params: ${JSON.stringify(params)} and query: ${JSON.stringify(query)}`;

    // Llamada al servicio de log (puedes hacerlo de forma asincrónica si lo prefieres)
    writeLog({
        message: logMessage,
        timestamp: new Date(),
        level: 'info',
    }).then(() => {
        console.log('Log written for:', method, path); // Opcional: Mensaje de consola
    }).catch(error => {
        console.error('Error writing log:', error); // Opcional: Manejo de errores de logging
    });

    next(); // No olvides llamar a next() para continuar con el flujo de solicitudes
}

export async function logMiddlewareAsync(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { method, path, params, query } = req;
    const logMessage = `Accessed ${method} ${path} with params: ${JSON.stringify(params)} and query: ${JSON.stringify(query)}`;

    try {
        // Esperar a que el log se escriba de forma asíncrona
        await writeLog({
            message: logMessage,
            timestamp: new Date(),
            level: 'info',
        });

        console.log('Log written for:', method, path); // Mensaje opcional en consola
    } catch (error) {
        // Manejar los errores de logging, aunque generalmente no se detiene el flujo
        console.error('Error writing log:', error);
    }

    next(); // Llamar a next() para continuar con el flujo de la solicitud
}
