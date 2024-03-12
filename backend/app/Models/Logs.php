<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $fillable = [
        'description',
        'date',
        'hour'
    ];

    public static function add($description){
        $log = Logs::create([
            'description'=>$description,
            'date'=>date('Y-m-d'),
            'hour'=>date("H:i:s")
        ]);
        return $log;
    }
}
