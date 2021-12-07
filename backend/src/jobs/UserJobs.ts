import { User } from "../entities/User";
import userRepository from "../repositories/user-repository";

export default {
    key: 'UserJobs',
    options: {
        delay: 0,
    },
    async handle({data}) {
        const { newUser } = data;
        const user = new User(newUser);
        await userRepository.create(user);
    }
}
