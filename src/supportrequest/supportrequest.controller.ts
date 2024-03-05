import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
  ConflictException,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  HttpCode,
  BadRequestException,
} from "@nestjs/common";
import { SupportRequestService } from "./supportrequest.service";
import { SignUpDto } from "../common/dto/sign-up.dto";
import { SupportRequest } from "src/entity/supportrequest.entity";
import { UserService } from "src/user/user.service";
import { RequestStatus } from "src/common/enums/requeststatus";
import { CreateRequestDto } from "src/common/dto/create-request.dto";

@Controller("supportrequests")
export class SupportRequestController {
  // Assuming SignUpDto contains the necessary request body fields

  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findAll(): Promise<SupportRequest[]> {
    return this.supportRequestService.findAll();
  }

  @Get(":id")
  async findById(
    @Param("id", new ParseIntPipe())
    id: number,
  ): Promise<SupportRequest> {
    return this.supportRequestService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() body: CreateRequestDto): Promise<{ id: number }> {
    try {
      const result = await this.supportRequestService.create(body);
      return { id: result.id };
    } catch (error) {
      throw new BadRequestException("Failed to create support request");
    }
  }

  @Post("/:requestId/signup")
  @HttpCode(HttpStatus.OK)
  async signUpForSupportRequest(
    @Param("requestId") requestId: number,
    @Body() signUpDto: SignUpDto, // Assuming SignUpDto contains the necessary request body fields
  ): Promise<{ message: string }> {
    // Check if the support request exists
    const supportRequest = await this.supportRequestService.findById(requestId);
    if (!supportRequest) {
      throw new NotFoundException("Support request not found");
    }

    // Check if the volunteer exists
    const user = await this.userService.findById(signUpDto.volunteerId);
    if (!user) {
      throw new NotFoundException("Volunteer not found");
    }

    // Check if the support request is already full
    if (supportRequest.status.localeCompare(RequestStatus.CLOSED)) {
      throw new ConflictException("Support request is already full");
    }

    try {
      // Sign up the volunteer for the support request
      let userAdded: boolean = await this.supportRequestService.signUpVolunteer(
        supportRequest,
        user,
      );

      let message: string;
      if (userAdded) {
        message = "Volunteer signed up successfully";
      } else {
        message = "Volunteer is already enrolled ";
      }
      return { message: message };
    } catch (error) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: "Volunteer sign up failed" },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }
}
