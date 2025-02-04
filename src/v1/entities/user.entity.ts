import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    CUSTOMER='customer',
    WORKER='worker'
}

@Entity({name:'users'})
export class User{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    username:string

    @Column()
    password:string

    @Column({unique:true})
    email:string

    @Column({type:'enum',
        enum:UserRole,
        default:UserRole.CUSTOMER
    })
    role:UserRole
}
//di default e un customer, nel momento che viene passato a worker ha la possibilita di inserire i servizi e nello stesso momento di essere un customer