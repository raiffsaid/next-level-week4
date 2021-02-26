import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { Survey } from "./Survey";
import { v4 as uuid } from 'uuid';

@Entity("surveys_users")
class SurveyUser {
    @PrimaryColumn()
    readonly id: string;

    @Column() //Se nome da columa = atributo, não precisa passar no parâmetro
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    survey_id: string;

    @ManyToOne(() => Survey)
    @JoinColumn({ name: 'survey_id' })
    survey: Survey;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) this.id = uuid(); // Se não existir o ID, atribuir um UUID
    }
}

export { SurveyUser };
