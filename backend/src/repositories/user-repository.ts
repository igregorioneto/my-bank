import { User } from '../entities/User';
import { UserInterface } from '../interfaces/User';

class UserRepository {
    public async getUsers(): Promise<UserInterface[]> {
        return await User.find({}, '-password');
    }

    public async getUserEmail(email: string): Promise<UserInterface> {
        return await User.findOne({ email });
    }

    public async create(data: UserInterface): Promise<UserInterface> {
        const user = new User(data);
        return await user.save();
    }

}

export default new UserRepository();