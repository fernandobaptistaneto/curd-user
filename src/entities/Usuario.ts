
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcrypt from 'bcryptjs'

@Entity('usuario')
export class Usuario {

  @PrimaryGeneratedColumn('uuid')
  id_usuario: number

  @Column({ type: 'varchar' })
  username: string

  @Column({ type: 'varchar' })
  password: string

  @Column({ type: 'varchar' })
  email: string

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

}

export default Usuario
