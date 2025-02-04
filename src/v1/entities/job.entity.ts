import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";


@Entity({ name: 'jobs' })
class JobEntity {

    @PrimaryGeneratedColumn('uuid')
    id_job: string

    @ManyToOne(()=>User,(user)=>user.id)
    worker:User

    @Column()
    title: string //titolo del job

    @Column()
    description: string //descrizione del job

    @Column({ type: 'decimal' })
    base_price: number //prezzo base del job, (costo orario)

    @Column()
    unit: string //unità di prezzo es. ora,pezzo,job,giorno
/**----------------------------------------------------------------------------------------------------------- */
    @Column()
    is_free_quote: boolean //preventivo

    @Column({ type: 'decimal' })
    quote_price:number //prezzo del preventivo

    @Column()
    deposit_required: boolean //se è richiesto un acconto

    @Column({ type: 'decimal' })
    deposit_amount: number //prezzo dell'acconto
/**----------------------------------------------------------------------------------------------------------- */
    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    update_at: Date

    @DeleteDateColumn()
    delete_at: Date
}

export default JobEntity