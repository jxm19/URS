<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('resit_exams', function (Blueprint $table) {
            $table->unsignedBigInteger('grade_id')->nullable(); 
        $table->foreign('grade_id')->references('id')->on('grades')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resit_exams', function (Blueprint $table) {
            $table->dropForeign(['grade_id']); 
            $table->dropColumn('grade_id'); 
        });
    }
};
