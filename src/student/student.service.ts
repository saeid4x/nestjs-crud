import { Injectable, NotFoundException } from '@nestjs/common';
import { IStudent } from './../interface/student.interface';
import {InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { CreateStudentDto } from './../dot/create-student.dto';
 
import { UpdateStudentDto } from './../dot/update-student.dto';
@Injectable()
export class StudentService {
    constructor(@InjectModel('Student') private studentModel:Model<IStudent>){

    }

    //creatinh a new student inside mongodb
    async createStudent(createStudentDto:CreateStudentDto):Promise<IStudent>{
        const newStudent = await new this.studentModel(createStudentDto);
        return newStudent.save();
    }

    //reading all the students from mongodb
    async getAllStudent():Promise<IStudent[]>{
        const studentData = await this.studentModel.find();
        if(!studentData || studentData.length ==0){
            throw new NotFoundException('Student data not found')
        }
        // console.log(studentData);
        return studentData;
    }


    // get an student that specify by id
    async getStudent(studentId:string):Promise<IStudent>{
        const student = await this.studentModel.findById(studentId);
        if(!student){
            throw new NotFoundException(`Student # ${studentId} not found`)
        }
        return student ;
        }


        // delete a student that specify by id
        async deleteStudent(studentId:string):Promise<IStudent>{
            const deletedStudent = await this.studentModel.findByIdAndDelete(studentId);
            if(!deletedStudent){
                throw new NotFoundException(`Student # ${studentId} not found`)
            }
            return deletedStudent;
        }


        // updateing existing student 
        async updateStudent(studentId:string, updateStudentDto:UpdateStudentDto):Promise<IStudent>{
            const updatedStudent =  await this.studentModel.findByIdAndUpdate(studentId,updateStudentDto,{new:true});
            if(!updatedStudent){
                throw new NotFoundException(`Student # ${studentId} not found for do update`)
            }
            return updatedStudent

        }


}
