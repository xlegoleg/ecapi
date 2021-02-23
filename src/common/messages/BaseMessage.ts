import { Response } from 'express';
import { ISendedObject } from '@interfaces/eva/SendedObjectInterface';

class BaseMessage {
  public status: number;
  public sendedObject: ISendedObject;
  public response: Response;
  constructor(status: number, sendedObject: ISendedObject, response: Response) {
    this.status = status;
    this.sendedObject = sendedObject;
    this.response = response;
  }

  public send(): void {
    this.response.status(this.status).send({
      message: this.sendedObject?.message || '',
      data: this.sendedObject?.data || null,
    })
  }
}
 
export default BaseMessage;