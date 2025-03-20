import { BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at',
  })
  updatedAt: Date | null;

  @BeforeInsert()
  setInitialUpdatedAt() {
    this.updatedAt = null;
  }
}
