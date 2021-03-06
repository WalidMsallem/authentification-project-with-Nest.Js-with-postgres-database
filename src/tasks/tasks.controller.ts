import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
 
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private TasksService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user : User
    ):Promise<Task[]>  {
  return this.TasksService.getTask(filterDto , user)
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id : number,
    @GetUser() user : User
    ):  Promise<Task> {
    return this.TasksService.getTaskById(id,user);
  }
  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user : User
    ): Promise<void>  {
   return this.TasksService.delelteTask(id,user);
  }

 

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user : User
    ): Promise<Task>  {
    
    return this.TasksService.createTask(createTaskDto , user);
  }

  @Patch('/:id/status')
  updateTaskstatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user : User
  ): Promise<Task> {
    return this.TasksService.updateTaskStatus(id, status,user);
  }
}
