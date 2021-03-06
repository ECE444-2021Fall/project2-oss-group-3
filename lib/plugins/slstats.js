'use strict';

const config = require('@serverless/utils/config');
const cliCommandsSchema = require('../cli/commands-schema');
const { legacy, log } = require('@serverless/utils/log');

class SlStats {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;

    this.commands = {
      slstats: {
        ...cliCommandsSchema.get('slstats'),
      },
    };

    this.hooks = {
      'slstats:slstats': this.toggleStats.bind(this),
    };
  }

  toggleStats() {
    const enableStats = this.options.enable && !this.options.disable;
    const disabledStats = this.options.disable && !this.options.enable;
    if (enableStats) {
      // set .serverlessrc config
      config.set('trackingDisabled', false);
      legacy.log('Stats successfully enabled');
      log.notice.success('Stats successfully enabled');
    } else if (disabledStats) {
      // set .serverlessrc config
      config.set('trackingDisabled', true);
      legacy.log('Stats successfully disabled');
      log.notice.success('Stats successfully disabled');
    }
  }
}

module.exports = SlStats;
