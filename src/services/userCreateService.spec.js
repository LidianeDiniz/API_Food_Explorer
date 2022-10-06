const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () =>{

    let userRepositoryInMemory= null;
    let userCreateService = null;

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepositoryInMemory);
    })

    it("user should be create", async () => {
        const user ={
            name: "User Test",
            email: "user@test.com",
            password: "123"
        };
        const userRepositoryInMemory = new UserRepositoryInMemory();
        const userCreateService = new UserCreateService(userRepositoryInMemory);
        const userCreated = await userCreateService.execute(user);
    
        console.log(userCreated)
        
        expect(userCreated).toHaveProperty("id");
    
        
       
    });

    it("user not should be created with exists email", async () => {
        const user1 = {
            name: "User test 1",
            email: "user@test.com",
            password:"123"
        };

        const user2 = {
            name: "User test 2",
            email: "user@test.com",
            password:"456"
        };

       

        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este e-mail já esta em uso!"))
        
    });
});

