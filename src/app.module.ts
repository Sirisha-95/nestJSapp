import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { SupportModule } from "./supportrequest/supportrequest.module";
import { ShiftModule } from "./shift/shift.module";
import { CommonModule } from "./common/common.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [AuthModule, SupportModule, ShiftModule, CommonModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
