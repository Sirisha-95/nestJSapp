// support-request.service.ts
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SupportRequest } from "../entity/supportrequest.entity";
import { User } from "src/entity/user.entity";
import { RequestStatus } from "src/common/enums/requeststatus";

@Injectable()
export class SupportRequestService {
  constructor(
    @InjectRepository(SupportRequest)
    private readonly supportRequestRepository: Repository<SupportRequest>,
  ) {}

  public async create(data: Partial<SupportRequest>): Promise<SupportRequest> {
    return this.supportRequestRepository.save(data);
  }

  async findAll(): Promise<SupportRequest[]> {
    return this.supportRequestRepository.find();
  }

  async findById(id: number): Promise<SupportRequest> {
    return this.supportRequestRepository.findOne({ where: { id } });
  }

  async signUpVolunteer(
    supportRequest: SupportRequest,
    user: User,
  ): Promise<boolean> {
    // Assuming you have a many-to-many relationship between SupportRequest and Volunteer entities
    // and you have a method to add a volunteer to the support request

    //to check if the user has already enrolled for the request
    const userExists = supportRequest.volunteers.find(
      (volunteer) => volunteer.id === user.id,
    );

    if (!userExists) {
      supportRequest.volunteers.push(user);

      //increment the enrolled volunteers by 1 when a new volunteer joins
      supportRequest.enrolled_volunteers += 1;

      //check to update the request status if the count of enrolled and maximum volunteers is equal
      if (
        supportRequest.enrolled_volunteers === supportRequest.max_volunteers
      ) {
        supportRequest.status = RequestStatus.CLOSED;
      }

      try {
        const result = await this.supportRequestRepository.update(
          supportRequest.id,
          supportRequest,
        );

        return !!result.affected;
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "Support request update failed",
          },
          HttpStatus.BAD_REQUEST,
          { cause: error },
        );
      }
    } else {
      return false;
    }
  }
}
