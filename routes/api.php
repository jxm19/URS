<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardUni\UserController;
use App\Http\Controllers\DashboardUni\StudentController;
use App\Http\Controllers\DashboardUni\CourseController;
use App\Http\Controllers\DashboardUni\InstructorController;
use App\Http\Controllers\DashboardInstructor\AuthController as InstructorAuthController;
use App\Http\Controllers\DashboardSecretary\AuthController as SecretaryAuthController;
use App\Http\Controllers\SiteStudent\AuthController as StudentAuthController;
use App\Http\Controllers\DashboardInstructor\ResetPasswordController as InstructorResetPasswordController;
use App\Http\Controllers\DashboardSecretary\ResetPasswordController as SecretaryResetPasswordController;
use App\Http\Controllers\SiteStudent\ResetPasswordController as StudentResetPasswordController;
use App\Http\Controllers\SiteStudent\CourseController as StudentCourseController;
use App\Http\Controllers\DashboardInstructor\CourseController as InstructorCourseController;
use App\Http\Controllers\DashboardInstructor\GradeController as InstructorGradeController;
use App\Http\Controllers\SiteStudent\GradeController as StudentGradeController;
use App\Http\Controllers\SiteStudent\ResitExamController as StudentResitExamController;
use App\Http\Controllers\DashboardInstructor\ResitExamController as InstructorResitExamController;
use App\Http\Controllers\ExamDetailsController ;
use App\Http\Controllers\ExamScheduleController;
use App\Http\Controllers\SiteStudent\ExamScheduleController as StudentExamScheduleController;
use App\Http\Controllers\SiteStudent\ExamDetailsController as StudentExamDetailsController;





Route::post('/site-student/resit_confirm_noauth', [StudentResitExamController::class, 'confirmWithoutAuth']);


Route::post('/exam-schedules/import', [ExamScheduleController::class, 'import']);
Route::get('/exam-schedules', [ExamScheduleController::class, 'index']);
Route::get('/exam-schedules/{id}', [ExamScheduleController::class, 'show']);
Route::middleware(['auth:sanctum'])->delete('/exam-schedules/{id}', [ExamScheduleController::class, 'destroy']);

Route::put('/exam-schedules/{id}', [ExamScheduleController::class, 'update']);


Route::group(['prefix' => 'dashboard-uni'], function () {
    Route::post('/login', [UserController::class, 'login']);

    Route::group(['middleware' => ['auth:sanctum' , 'is_university']], function () {
        Route::apiResource('/users', UserController::class);
        Route::apiResource('/students', StudentController::class);
        Route::apiResource('/courses', CourseController::class);
        Route::apiResource('/instructors', InstructorController::class);

    });
});






Route::group(['prefix' => 'dashboard-instructor'], function () {
    Route::post('/login', [InstructorAuthController::class, 'login']);

    Route::group(['middleware' => ['auth:sanctum' , 'is_instructor']], function () {

        Route::get('/confirmed-students/export/{courseId}', [InstructorResitExamController::class, 'exportConfirmedStudents']);

        Route::post('/logout', [InstructorAuthController::class, 'logout']);
        Route::get('/courses', [InstructorCourseController::class, 'index']);
        Route::get('/courses/{id}', [InstructorCourseController::class, 'show']);
        Route::apiResource('/grades', InstructorGradeController::class);
        Route::post('/import-grades', [InstructorGradeController::class, 'import']);
        Route::get('/courses/{courseId}/grades', [InstructorGradeController::class, 'index']);
        Route::delete('/grades/course/{courseId}', [InstructorGradeController::class, 'destroyByCourse']);
        Route::get('/confirmed-students/{Courseid}', [InstructorResitExamController::class, 'confirmedStudents']);
        Route::middleware('auth:sanctum')->get('/instructor/exam-schedules', [ExamScheduleController::class, 'instructorExamSchedules']);


        Route::post('/exam-details', [ExamDetailsController::class, 'store']);
        Route::get('/exam-details', [ExamDetailsController::class, 'index']);

    Route::get('/exam-details/{id}', [ExamDetailsController::class, 'show']);
    Route::put('/exam-details/{id}', [ExamDetailsController::class, 'update']);
    Route::delete('/exam-details/{id}', [ExamDetailsController::class, 'destroy']);
    });
    
    Route::group(['prefix' => '/password'], function () {
        Route::post('/forget', [InstructorResetPasswordController::class,'forget']);
        Route::post('/otp/verify',  [InstructorResetPasswordController::class,'verify']);
        Route::post('/reset',  [InstructorResetPasswordController::class,'reset']);
    });
});



Route::group(['prefix' => 'dashboard-secretary'], function () {
        Route::post('/login', [SecretaryAuthController::class, 'login']);


        Route::group(['middleware' => ['auth:sanctum', 'is_secretary']], function () {
            Route::post('/logout', [SecretaryAuthController::class, 'logout']);
        });

        Route::group(['prefix' => '/password'], function () {
            Route::post('/forget', [SecretaryResetPasswordController::class,'forget']);
            Route::post('/otp/verify',  [SecretaryResetPasswordController::class,'verify']);
            Route::post('/reset',  [SecretaryResetPasswordController::class,'reset']);
        });
    });



Route::group(['prefix' => 'site-student'], function () {
    Route::post('/login', [StudentAuthController::class, 'login']);

    Route::group(['middleware' => ['auth:sanctum', 'is_student']], function () {
        Route::post('/logout', [StudentAuthController::class, 'logout']);
        Route::get('/courses', [StudentCourseController::class, 'index']);
        Route::get('/courses/{id}', [StudentCourseController::class, 'show']);
        Route::get('/grades', [StudentGradeController::class, 'index']);
        Route::post('/resit_confirm',[StudentResitExamController::class, 'Confirm']);
        Route::get('/resit_confirmed', [StudentResitExamController::class, 'index']);
        Route::delete('/resit_confirm/{id}',[StudentResitExamController::class, 'destroy']);
        
       

    });

    Route::group(['prefix' => '/password'], function () {
        Route::post('/forget', [StudentResetPasswordController::class,'forget']);
        Route::post('/otp/verify',  [StudentResetPasswordController::class,'verify']);
        Route::post('/reset',  [StudentResetPasswordController::class,'reset']);
    });
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/student/exam-schedules', [StudentExamScheduleController::class, 'index']);
    Route::get('/student/exam-schedules/{course_id}', [StudentExamScheduleController::class, 'show'])
         ->whereNumber('course_id');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/student/exam-details', [StudentExamDetailsController::class, 'index']);
    Route::get('/student/exam-details/{course_id}', [StudentExamDetailsController::class, 'show'])
         ->whereNumber('course_id');
});