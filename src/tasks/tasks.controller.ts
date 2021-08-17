import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { UpdateTaskStatus } from './dto/update-task-status.dto';
import {Task} from './task.entity'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilterDto) {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get('/:id')
  getTaskByID(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto):Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatus: UpdateTaskStatus,
  // ): Task {
  //   const {status} = updateTaskStatus
  //   console.log(status)
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTaskById(id);
  }
}
