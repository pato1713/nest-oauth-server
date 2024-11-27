import { Exclude } from 'class-transformer';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'authentications' })
export class AuthenticationEntity extends AbstractEntity {
  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => UserEntity, (user: UserEntity) => user.authentication)
  @Exclude()
  public user: UserEntity;
}
