import PriorityQueue from "priority-queue-typescript";
export class Dijkstras{
  private pq:PriorityQueue<number>;
  constructor(pq:PriorityQueue<number>) {
    this.pq = pq;
    console.log(pq);
  }
}
