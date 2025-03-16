import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request as Req } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetSingleUserDTO, UpdateUserDTO, type GetAllUsersDTO, type GetUserStatsDTO } from '../types/dtos.js';
import { UserAuthGuard } from '../guards/user.guard.js';
import { AdminAuthGuard } from '../guards/admin.guard.js';
import { UsersService } from './users.service.js';

@Controller('/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiTags('admin')
  @UseGuards(AdminAuthGuard)
  getAllUsers(): Promise<GetAllUsersDTO> {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  @ApiTags('admin')
  @UseGuards(AdminAuthGuard)
  @ApiOperation({ summary: 'Get single admin', description: 'Get admin data by id' })
  @ApiResponse({ status: 200, description: 'Returns admin', type: GetSingleUserDTO })
  @ApiParam({ required: true, name: 'id', type: String, description: 'Admin id', example: 'as64c32647c1234c3421' })
  async getSingleAdmin(@Param('id') id: string): Promise<GetSingleUserDTO> {
    return this.usersService.getSingleUser(id);
  }

  @Patch('/:id')
  @ApiTags('admin')
  @UseGuards(AdminAuthGuard)
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiOperation({ summary: 'Get single admin', description: 'Update admin by id' })
  @ApiResponse({ status: 204, description: 'No content' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiParam({ required: true, name: 'id', type: String, description: 'Admin id', example: 'as64c32647c1234c3421' })
  async updateAdmin(@Param('id') id: string, @Body() body: UpdateUserDTO): Promise<void> {
    return this.usersService.updateAdmin(id, body);
  }

  @Delete('/:id')
  @ApiTags('admin')
  @UseGuards(AdminAuthGuard)
  @HttpCode(StatusCodes.NO_CONTENT)
  @ApiOperation({ summary: 'Get user', description: 'Get user by id' })
  @ApiResponse({ status: StatusCodes.NO_CONTENT, description: 'No content' })
  @ApiParam({ required: true, name: 'id', type: String, description: 'Admin id', example: 'as64c32647c1234c3421' })
  async deleteAdmin(@Param('id') id: string): Promise<void> {
    return this.usersService.deleteAdmin(id);
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
