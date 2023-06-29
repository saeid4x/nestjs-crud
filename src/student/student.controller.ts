import { Controller,Post,Get,Res,Put,Param,HttpStatus,Body, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './../dot/create-student.dto';
import { UpdateStudentDto } from './../dot/update-student.dto';
 

@Controller('student')
export class StudentController {
    constructor(private studentService:StudentService){}

    @Post()
    async createStudent(@Res() response, @Body() createStudentDto:CreateStudentDto){
        try{
            const newStudent = await this.studentService.createStudent(createStudentDto);
            return response.status(HttpStatus.CREATED).json({
                mesasge:'Student has been created Succcessfully',
                newStudent
            })
        } catch(err){
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode:400,
                message:"Error: Student not Created",
                error:'Bad Request'
            })
        }
    }


    @Get()
    async getStudents(@Res() response){
        try{
            const students = await this.studentService.getAllStudent();
            
            return response.status(HttpStatus.OK).json({
                message:"All students data found successfully",
                students
            })
           
        }catch(err){  
            return response.status(err.status).json(err.response) 

        }
    }



    @Put('/:id')
    async updateStudent(@Res() response, @Param('id') studentId:string,@Body() updateStudentDto:UpdateStudentDto){
        try{
            const updatedStudent = await this.studentService.updateStudent(studentId,updateStudentDto);
            return response.status(HttpStatus.OK).json({
                message:'Studnet has been successfuly updated',
                updatedStudent
            })
           }
           catch(err){
            return response.status(err.status).json(err.response);
           } 
    }


    @Delete('/:id')
    async deleteStudent(@Res() response, @Param('id') studnetId:string){
        try{
            const deletedStudent = await this.studentService.deleteStudent(studnetId);
            return response.status(HttpStatus.OK).json({
                message:'Student Deleted Successfully',
                deletedStudent
            })
        }
        catch(err){
                return response.status(err.status).json(err.response)
        }
    }



     
}
