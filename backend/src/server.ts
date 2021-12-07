import app from "./app";
import http from "http"
import BullBoard from 'bull-board';

import Queue from './lib/Queue';

BullBoard.setQueues(Queue.queues.map(queue => queue.bull));

app.use('/admin/queues', BullBoard.UI);

const port = process.env.PORT || 3333;
const server = http.createServer(app);

server.listen(port,() => console.log('Server is running on', port));
