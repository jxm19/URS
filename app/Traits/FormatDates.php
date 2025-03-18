<?php

namespace App\Traits;

use Carbon\Carbon;

trait FormatDates
{
   
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');  
    }

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s');  
    }
}
