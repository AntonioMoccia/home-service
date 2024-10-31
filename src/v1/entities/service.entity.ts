import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity({ name: 'services' })
class ServiceEntity {

    @PrimaryGeneratedColumn('uuid')
    service_id: string

    @ManyToOne(()=>User,(user)=>user.id)
    worker:User
    @Column()
    title: string

    @Column()
    description: string

    @Column({ type: 'decimal' })
    base_price: number

    @Column()
    unit: string

    @Column()
    is_free_quote: boolean

    @Column()
    deposit_required: boolean

    @Column({ type: 'decimal' })
    deposit_amount: number
}

export default ServiceEntity