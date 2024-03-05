// shift.service.ts

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shift } from "../entity/shift.entity";

@Injectable()
export class ShiftService {
  constructor(
    @InjectRepository(Shift)
    private shiftRepository: Repository<Shift>,
  ) {}

  async findAll(): Promise<Shift[]> {
    return this.shiftRepository.find();
  }

  async findById(id: number): Promise<Shift> {
    return this.shiftRepository.findOne({ where: { id } });
  }

  public async create(data: Partial<Shift>): Promise<Shift> {
    return this.shiftRepository.save(data);
  }
}
