<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('exam_details', function (Blueprint $table) {
        $table->string('announcement_title')->after('instructor_id');
    });
}

    /**
     * Reverse the migrations.
     */
    public function down()
{
    Schema::table('exam_details', function (Blueprint $table) {
        $table->dropColumn('announcement_title');
    });
}

};
