import { BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date | null;

  @BeforeInsert()
  setInitialUpdatedAt() {
    this.updatedAt = null;
  }
}
