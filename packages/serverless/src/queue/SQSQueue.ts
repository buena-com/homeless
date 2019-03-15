import { promisify } from '@home-ht/common';
import { SQSEvent } from 'aws-lambda';
import { SQS } from 'aws-sdk';
import { SendMessageResult } from 'aws-sdk/clients/sqs';

/**
 * Simple wrapper that promisifies the SQS api of aws and adds some deserialization/serialization for the messages.
 */
export class SQSQueue<T extends object> {

  private constructor(private sqs: SQS, private queueUrl: string) {}

  /**
   * Create access to a given sqs queue based on the arn name.
   * @param queueUrl
   * @param region
   */
  static create<T extends object>(queueUrl: string, region: string): SQSQueue<T> {
    const sqs  = new SQS({ apiVersion: '2012-11-05', region });

    return new SQSQueue(sqs, queueUrl);
  }

  /**
   * Stream generator, that deserializes the message body and deletes the message once it has been consumed from this
   * queue.
   *
   * @param event
   */
  async *createConsumerStream(
    { Records }: SQSEvent,
  ): AsyncIterableIterator<T> {
    for (const message of Records) {
      console.log(`Processing: messageId=${message.messageId}`);
      yield JSON.parse(message.body);
      console.log(`Finished: messageId=${message.messageId}`);
      await this.deleteMessage({
        ReceiptHandle: message.receiptHandle,
      });
      console.log(`Deleted: messageId=${message.messageId}`);
    }
  }

  sendMessage = async (message: T): Promise<SendMessageResult> => {
    return promisify<SendMessageResult>(callback =>
      this.sqs.sendMessage({
        QueueUrl: this.queueUrl,
        MessageBody: JSON.stringify(message),
      }, callback));
  }

  private deleteMessage = async ({ ReceiptHandle }: { ReceiptHandle: string }): Promise<{}> => {
    return promisify<{}>(handler => {
      this.sqs.deleteMessage({
        ReceiptHandle,
        QueueUrl: this.queueUrl,
      }, handler);
    });
  }

}
