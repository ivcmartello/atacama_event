/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { EventInterface } from './event.interface';

@Entity('events')
export class Event implements EventInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Index()
  @Column()
  initial_date: Date;

  @Index()
  @Column()
  final_date: Date;

  @Column({ nullable: true })
  cancelled_at: Date;

  @Column({ nullable: true })
  confirmed_at: Date;

  @Column()
  showed_up: boolean;

  @Column()
  customer_id: number;

  @Column({ select: false })
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  customer: any;

  set_customer(customers: any) {
    this.customer = {};

    for (let i = 0; i < customers.length; i++) {
      if (customers[i].id === this.customer_id) {
        this.customer = customers[i];
        break;
      }
    }

    return this;
  }
}
