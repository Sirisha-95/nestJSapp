import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  BadRequestException,
} from "@nestjs/common";
import { Shift } from "src/entity/shift.entity";
import { ShiftService } from "./shift.service";
import { CreateShiftDto } from "src/common/dto/create-shift.dto";

@Controller("shifts")
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Get()
  async findAll(): Promise<Shift[]> {
    return this.shiftService.findAll();
  }

  @Get(":id")
  async findById(
    @Param("id", new ParseIntPipe())
    id: number,
  ): Promise<Shift> {
    return this.shiftService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() body: CreateShiftDto): Promise<{ id: number }> {
    try {
      const result = await this.shiftService.create(body);
      return { id: result.id };
    } catch (error) {
      throw new BadRequestException("Failed to create support request");
    }
  }
}
