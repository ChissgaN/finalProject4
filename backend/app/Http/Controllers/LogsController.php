<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $logs = Logs::all();
        return response()->json($logs);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Logs $log)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Logs $log)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Logs $log)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Logs $log)
    {
        //
    }
}
