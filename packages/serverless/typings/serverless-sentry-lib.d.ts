// See https://github.com/arabold/serverless-sentry-lib

declare module 'serverless-sentry-lib' {
  import { Handler } from 'aws-lambda';
  import { Client } from 'raven';

  type PluginConfig = {
    // Automatically; create; breadcrumbs (see Sentry Raven docs, defaults to true)
    autoBreadcrumbs: boolean;
    // Don; 't report errors from local environments (defaults to true);
    filterLocal: boolean;
    // capture; Lambda; errors (defaults to true);
    captureErrors?: boolean;
    // capture; unhandled; exceptions (defaults to true);
    captureUnhandledRejections?: boolean;
    // monitor; memory; usage (defaults to true);
    captureMemoryWarnings?: boolean;
    //  monitor; execution; timeouts (defaults to true);
    captureTimeoutWarnings?: boolean;
    // Your Raven client. Don't forget to set this if you send your own custom messages and exceptions to Sentry later in your code.
    ravenClient: Client;
  };

  function handler<TEvent, TResult>(pluginConfig: PluginConfig | Client, handler: Handler<TEvent, TResult>): Handler<TEvent, TResult>;

}
