import {cell} from "../../board/board.component";

interface Traversal{
  getVisitedQueue() : cell[];
  getPath() : cell[];
}
