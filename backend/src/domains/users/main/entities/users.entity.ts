import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', name: 'phone'})
    phone: string;

    @Column({type:'text', name: 'code_hash'})
    codeHash: string;

    @Column({ type: 'timestamptz', name:'code_expires_at' })
    codeExpiresAt: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP', name: 'updated_at' })
    updatedAt: Date;
}