<?php

namespace App\Http\Controllers;

use App\Models\Logs;
use App\Models\Pages;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pages = Pages::all();
        return response()->json($pages);
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
            $request->validate([
                'URL' => 'required',
                'name' => 'required',
                'description' => 'required'
            ]);

            $pages = Pages::create($request->all());

            $logs = Logs::add("A new page was created with the id: {$pages->id}");

            if (!$logs) {
                throw new \Exception('Error creating log.');
            }

            return response()->json(['pages' => $pages]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(Pages $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pages $pages)
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
                'URL' => 'required',
                'name' => 'required',
                'description' => 'required'
            ]);

            $page = Pages::findOrFail($id);
            $page->update($request->all());

            $logs = Logs::add("Page with the id {$page->id} was updated.");

            if (!$logs) {
                throw new \Exception('Error creating log.');
            }

            return response()->json($page);
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
            $pages = Pages::findOrFail($id);
            $pages->delete();

            $logs = Logs::add("Page with the id {$id} was deleted.");

            if (!$logs) {
                throw new \Exception('Error creating log.');
            }

            return response()->json(['message' => 'The page was  successfully removed']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function softDelete(Request $request, $id)
    {
        try {
            $request->validate([
                'status' => 'required|in:active,inactive'
            ]);

            $newStatus = $request->input('status');

            $Pages = Pages::findOrFail($id);
            $Pages->status = $newStatus;
            $Pages->save();
            $statusChange = ($newStatus == 'active') ? 'activated' : 'inactivated';
            $logs = Logs::add("The Page with the id: {$Pages->id} was $statusChange.");

            if (!$logs) {
                throw new \Exception('Error creating log.');
            }

            return response()->json(['message' => 'Pages status changed successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
