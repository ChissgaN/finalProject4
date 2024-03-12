<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\Roll;
use Illuminate\Http\Request;

class RollController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roll = Roll::all();
        return response()->json($roll);
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
        try {
            $request->validate(['name' => 'required']);

            $roll = Roll::create($request->all());

            $logs = Logs::add("A new roll was created with the id: {$roll->id}");

            if (!$logs) {
                throw new \Exception('Error creating log.');
            }

            return response()->json(['roll' => $roll]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $roll = Roll::findOrFail($id);
        return response()->json($roll);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Roll $roll)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|unique:rolls,name,' . $id,
            ]);

            $roll = Roll::findOrFail($id);
            $roll->update($request->all());

            $logs = Logs::add("A roll with the id {$roll->id} was updated.");

            if (!$logs) {
                throw new \Exception('Error creating log.');
            }

            return response()->json($roll);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     */

    public function destroy($id)
    {
        try {
            $roll = Roll::findOrFail($id);
            $roll->delete();

            $logs = Logs::add("Roll with the id {$id} was deleted.");

            if (!$logs) {
                throw new \Exception('Error creating log.');
            }

            return response()->json(['message' => 'The Roll was deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
