import { Request, Response } from 'express';
import { GetExtensionsService } from '../services/getextensions.service';

const getExtensionsService = new GetExtensionsService();

export class GetExtensionsController {
  async processExtension(req: Request, res: Response) {
    try {
      const { extensionName, repo, id } = req.body;
      await getExtensionsService.processExtension(extensionName, repo, id);
      res.status(200).send({ message: 'Proceso de extensión completado' });
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
}