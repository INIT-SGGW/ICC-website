import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request as Req } from 'express';
import type { GetAllUsersDTO, GetUserStatsDTO } from '../types/dtos.js';
import { UserAuthGuard } from '../guards/user.guard.js';
import { AdminAuthGuard } from '../guards/admin.guard.js';
import { UsersService } from './users.service.js';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/admin')
  @ApiTags('users', 'admin')
  @UseGuards(AdminAuthGuard)
  getAllUsers(): Promise<GetAllUsersDTO> {
    return this.usersService.getAllUsers();
  }

  @Get('/stats')
  @ApiTags('users')
  @UseGuards(UserAuthGuard)
  async getStats(@Request() { user }: Req): Promise<GetUserStatsDTO> {
    return this.usersService.getUserStats(user);
  }

  // @Post()
  // createUser(@Body() body: CreateUserDTO) {
  //   return this.usersService.createUser(body);
  // }

  // @Get(':id')
  // getOneUser(@Param('id') id: string) {
  //   return this.usersService.getOneUser(Number(id));
  // }

  // @Patch(':id')
  // updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
  //   return this.usersService.updateUser(Number(id), body);
  // }

  // @Delete(':id')
  // deleteUser(@Param('id') id: string) {
  //   return this.usersService.deleteUser(Number(id));
  // }
}
