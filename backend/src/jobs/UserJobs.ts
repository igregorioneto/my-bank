import { User } from "../entities/User";
import userRepository from "../repositories/user-repository";
export default {
    key: 'UserJobs',
    options: {
        delay: 1000,
    },
    async handle({data}) {
        const user = new User(data);
        await user.save();
        console.log(user);
    }
}
