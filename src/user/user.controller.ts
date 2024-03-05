import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  ConflictException,
  ParseIntPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/entity/user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async findById(
    @Param("id", new ParseIntPipe())
    id: number,
  ): Promise<User> {
    return this.userService.findById(id);
  }
}
