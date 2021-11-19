import { User } from '../entities/User';
import { UserInterface } from '../interfaces/User';

class UserRepository {
    public async getUsers(): Promise<UserInterface[]> {
        return await User.find({}, '-password');
    }

    public async getUserById(id: string): Promise<UserInterface> {
        return await User.findById(id);
    }

    public async getUserEmail(email: string): Promise<UserInterface> {
        return await User.findOne({ email });
    }

    public async create(data: UserInterface): Promise<UserInterface> {
        const user = new User(data);
        return await user.save();
    }

    public async update(id,data: UserInterface): Promise<UserInterface> {
        const { email, name, password, balance } = data;
        return await User.findByIdAndUpdate(id, {
            email,
            name,
            password,
            balance
        });
    }

}

export default new UserRepository();