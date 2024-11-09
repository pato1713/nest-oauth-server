import { AuthenticationEntity } from 'src/authentication/entities/authentication.entity';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column()
  public firstName: string;

  @OneToOne(
    () => AuthenticationEntity,
    (authentication: AuthenticationEntity) => authentication.user,
    { eager: true, nullable: false, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  @Index()
  public authentication: AuthenticationEntity;
}
