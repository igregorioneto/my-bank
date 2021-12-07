import Queue from 'bull';
import { redis } from '../config';
import * as jobs from '../jobs';

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, redis),
    name: job.key,
    handle: job.handle,
    options: job.options
}));

export default {
    queues,
    async add(name: any, data: any) {
        const queue = this.queues.find(queue => queue.name === name);
        return await queue.bull.add(data, queue.options);
    },
    process(){
        return this.queues.forEach(async (queue) => {
            await queue.bull.process(queue.handle);
            await queue.bull.on('failed', (job, err) => {
                console.log('Job failed: ', queue.key, job.data);
                console.log(err);
            })
        })
    }
}