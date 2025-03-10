import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminAuthGuard } from '../auth/auth.guard.js';
import type { GetAllUsersDTO } from '../types/dtos.js';
import { UsersService } from './users.service.js';

@Controller('/admin/users')
@ApiTags('users', 'admin')
@UseGuards(AdminAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<GetAllUsersDTO> {
    return this.usersService.getAllUsers();
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
