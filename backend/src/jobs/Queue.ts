import Queue from 'bull';
import userCreateJobs from './user-create-jobs';
import { redis } from '../config';

const newUser = new Queue(userCreateJobs.key, redis);

export default newUser;