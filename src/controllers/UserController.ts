import { Request, Response } from 'express'; // Necessário para informar o tipo
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppError(err);
        }
       
        /**
         * Repository é um EntityManager que permite realizar ações no banco de dados.
         * Toda comunicação feita com o banco de dados é feita através do repositório.
         * Para cada entidade (User) existirá um respositório específico.
         */ 
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({email});

        if (userAlreadyExists) throw new AppError('User already exist!');

        //Cria objeto de usuário
        const user = usersRepository.create({name, email}); 

        // Necessário criar o usuário antes utilizando o repositório antes de salvar
        await usersRepository.save(user); 

        return response.status(201).json(user);
    }
}

export { UserController };
