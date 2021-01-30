import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
import { MyDBModifier } from "./dbHandler";

interface myTodoElement {
  priority?: number;
  todoWhat: string;
  isDone?: boolean;
  /*todoBy: string;
  createdBy: string;
  completedBy: string;
  createdOn: Date;
  completedOn: Date;
  deletedOn: Date;*/
}
/*
task types: 
priority: 0-100
status: toDo - done - deleted - ? redo? 
todoby: name;
todowhat: describe activity;
created on: date time;
created by: name;
deadline: date time;
completed on: date time;
deleted on: date time;
*/

class TodoApp {
  private todoStream: myTodoElement[] = [];

  constructor(toDo: string[]) {
    toDo.forEach((a) => {
      this.todoStream.push(JSON.parse(a));
    });
  }

  addTodo(task: myTodoElement): void {
    if (!task.isDone) {
      task.isDone = false;
    } else {
      task.isDone = true;
    }
    if (!task.priority) {
      task.priority = 100;
    }
    this.todoStream.push(task);
  }

  removeTodo(index: number): void {
    if (index <= this.todoStream.length) {
      this.todoStream.splice(index - 1, 1);
    }
  }

  printList(): void {
    this.todoStream.forEach((a) => {
      console.log(a.priority + "-" + a.todoWhat);
    });
  }
}

//It would be great to have some more interesting fields in this too, but the deadline is too tight
//class TodoTaskHandler {}

const myLittleDB = new MyDBModifier("todo1.txt");
const workOnTodo = new TodoApp(myLittleDB.getDBData());

workOnTodo.printList();
