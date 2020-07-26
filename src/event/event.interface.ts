export interface EventInterface {
  id?: number;
  title: string;
  initial_date: Date;
  final_date: Date;
  cancelled_at?: Date;
  confirmed_at?: Date;
  showed_up: boolean;
  customer_id: number;
}
