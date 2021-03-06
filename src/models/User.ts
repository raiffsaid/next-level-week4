import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column() //Se nome da columa = atributo, não precisa passar no parâmetro
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) this.id = uuid(); // Se não existir o ID, atribuir um UUID
    }
}

export { User };
