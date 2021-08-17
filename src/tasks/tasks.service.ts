import { Injectable, NotFoundException } from '@nestjs/common';
import {TaskStatus} from './task-status.enum'
import { v4 as uuid} from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ){

  }
  
  // private tasks: Task[] = []


  // getAllTasks(): Task[] {
  //   return this.tasks
  // }


  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne(id)

    if(!found){
      throw new NotFoundException()
    }
    
    return found
  }


  // createTask(createTaskDto: CreateTaskDto): Task {
    
  //   const {title,description} = createTaskDto

  //   const task : Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   }

  //   this.tasks.push(task)

  //   return task
  // }

  createTask(createTaskDto:CreateTaskDto): Promise<Task>{
    return this.taskRepository.createTask(createTaskDto)
  }


  // getTaskWithFilters(filterDto: GetTaskFilterDto):Task[]{
  //   const {status,search} = filterDto

  //   let tasks = this.getAllTasks()

  //   if(status){
  //     tasks = tasks.filter((task) => task.status == status)
  //   }

  //   if(search){
  //     tasks = tasks.filter((task) => {
  //       if(task.title.includes(search) || task.description.includes(search)){
  //           return true
  //       }
  //       return false
  //     })
  //   }

  //   return tasks
  // }



  // updateTaskStatus(id : string,status : TaskStatus){
  //   const task = this.getTaskByID(id)
  //   task.status = status
  //   console.log(id,status,task)
  //   return task

  // }


  deleteTaskById(id: string): Promise<Task>{

    const task = this.getTaskById(id)

    if(!task) throw new NotFoundException()
    
    return this.taskRepository.deleteTask(task)
  }
  // deleteTaskById(id: string): Task[]{
  //   const task = this.getTaskByID(id)
  //   const indexToDelete = this.tasks.findIndex(task => task.id === id)
  //   return this.tasks.splice(indexToDelete - 1,indexToDelete + 1 )
  // }



}
