import * as getenv from 'getenv';
import { SQSQueue } from './SQSQueue';

const createQueue = <T extends object>(key: string) => () => SQSQueue.create<T>(
  getenv.string(key), getenv.string('region', 'eu-central-1'),
);

export type IndexEventType = 'Created' | 'Updated' | 'Deactivated';

/**
 * Event that is used to communicate across queues.
 */
export type IndexEvent = {
  type: IndexEventType;
  listingUrl: string;
  listingDetailsId: string;
  enriched: boolean;
};

/**
 * All queues that are used within this setup.
 */
export const Queues = {
  enrichmentQueue: createQueue<IndexEvent>('IS24_ENRICH_LISTING_DETAILS_QUEUE'),
  notificationEventQueue: createQueue<IndexEvent>('IS24_RESULT_NOTIFICATION_QUEUE'),
};
