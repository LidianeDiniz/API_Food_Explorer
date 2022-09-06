class UserRepositoryInMemory {
    users =[];

    async create({email, name, password}){
        const user = {
            id: Math.floor(Math.random() * 1000) + 1,
            email,
            name,
            password
        };

        this.users.push(user);

        return user;
    }

  async findByEmail(email){
    return this.users.find(user => user.email === email);
  }
}

module.exports = UserRepositoryInMemory;