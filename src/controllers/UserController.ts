import { Request, Response } from 'express'; // Necessário para informar o tipo
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;
       
        /**
         * Repository é um EntityManager que permite realizar ações no banco de dados.
         * Toda comunicação feita com o banco de dados é feita através do repositório.
         * Para cada entidade (User) existirá um respositório específico.
         */ 
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({email});

        if (userAlreadyExists) {
            return response.status(400).json({
                error: "User already exists!"
            });
        }

        //Cria objeto de usuário
        const user = usersRepository.create({name, email}); 

        // Necessário criar o usuário antes utilizando o repositório antes de salvar
        await usersRepository.save(user); 

        return response.json(user);
    }
}

export { UserController };
