import { Module } from "@nestjs/common";
import { SupportRequestController } from "./supportrequest.controller";
import { SupportRequestService } from "./supportrequest.service";

@Module({
  controllers: [SupportRequestController],
  providers: [SupportRequestService],
})
export class SupportModule {}
