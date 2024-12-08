import { AbstractEntity } from '@/common/entities/abstract.entity';
import { Column, Entity } from 'typeorm';
import { ClientType } from '@/oauth-clients/enums/client-type.enum';
import { GrantType } from '@/oauth-clients/enums/grant-type.enum';

@Entity('oauth_clients')
export class OAuthClientEntity extends AbstractEntity {
  @Column()
  public clientId: string;

  @Column()
  public clientSecret: string;

  @Column('simple-array')
  public redirectUris: string[];

  @Column({
    type: 'enum',
    enum: ClientType,
  })
  public clientType: ClientType;

  @Column('simple-array')
  public grantTypes: GrantType[];
}
