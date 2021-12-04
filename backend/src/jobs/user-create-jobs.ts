import  UserRepository  from '../repositories/user-repository';

export default {
    key: 'UserCreateJobs',
    async handle({ data }) {
        const { user: { name, email, password, roles } } = data;

        await UserRepository.create({
            name,
            email,
            password,
            roles
        });
    }
}