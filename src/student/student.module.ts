import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { StudentSchema } from '../schema/student.schema';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
@Module({
    imports:[MongooseModule.forFeature([{name:'Student',schema:StudentSchema}])],
    controllers:[StudentController],
    providers:[StudentService],
    exports:[StudentService]

})
export class StudentModule {}
