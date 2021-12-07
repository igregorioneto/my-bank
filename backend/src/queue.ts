import * as dotenv from "dotenv";
dotenv.config();
import Queues from './lib/Queue';

Queues.process();