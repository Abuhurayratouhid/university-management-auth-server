import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('🔥Database connected🔥');

    app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`);
    });
  } catch {
    errorLogger.error('failed to connect Database');
  }

  // process.on('undandledRejection', error => {
  //   if(server){
  //     server.close(()=>{
  //       errorLogger.error(error)
  //       process.exit(1)
  //     })
  //   } else{

  //     process.exit(1)
  //   }
  // })
}

main();
