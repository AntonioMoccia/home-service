import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity({ name: 'services' })
class ServiceEntity {

    @PrimaryGeneratedColumn('uuid')
    id_service: string

    @ManyToOne(()=>User,(user)=>user.id)
    worker:User
    @Column()
    title: string //titolo del servizio

    @Column()
    description: string //descrizione del servizio

    @Column({ type: 'decimal' })
    base_price: number //prezzo base del servizio, (costo orario)

    @Column()
    unit: string //unità di prezzo es. ora,pezzo,servizio,giorno

    @Column()
    is_free_quote: boolean //preventivo

    @Column({ type: 'decimal' })
    quote_price:number //prezzo del preventivo

    @Column()
    deposit_required: boolean //se è richiesto un acconto

    @Column({ type: 'decimal' })
    deposit_amount: number //prezzo dell'acconto
}

export default ServiceEntity