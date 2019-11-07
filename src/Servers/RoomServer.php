<?php
namespace Vipbressanon\LiveTool\Servers;

use DB;
use Vipbressanon\LiveTool\Models\Room;
use Vipbressanon\LiveTool\Models\RoomBlack;
use Vipbressanon\LiveTool\Servers\ApiServer;

class RoomServer
{

    public function __construct()
    {
    }

    public function detail($course_id, $teacher_id)
    {
        $res = Room::select('id', 'hash_id', 'course_id', 'roomtype', 'roomchat', 'roomspeak', 'roomhand')
                ->where('course_id', $course_id)
                ->first();
        if (!$res) {
            $now = date('Y-m-d H:i:s');
            $res = new Room();
            $res->hash_id = '';
            $res->course_id = $course_id;
            $res->roomtype = 2;
            $res->roomchat = 1;
            $res->roomspeak = 0;
            $res->roomhand = 1;
            $res->save();
        }
        if ($res->hash_id == '') {
            $api = new ApiServer();
            $data = $api->number($res->id, $teacher_id);
            $res->hash_id = $data ? $data->hash_id : '';
            $res->save();
        }
        return [
            'id' => $res->id,
            'hash_id' => $res->hash_id,
            'course_id' => $res->course_id,
            'roomtype' => $res->roomtype,
            'roomchat' => $res->roomchat,
            'roomspeak' => $res->roomspeak,
            'roomhand' => $res->roomhand
        ];
    }
    
    public function start($course_id, $room_id)
    {
        $now = date('Y-m-d H:i:s');
        $course = config('livetool.course');
        DB::table($course['table'])
            ->where($course['field']['id'], $course_id)
            ->update([
                $course['field']['starttime'] => $now,
                $course['field']['endtime'] => null,
                $course['field']['status'] => 1,
                $course['field']['updated_at'] => $now
            ]);
        $api = new ApiServer();
        $api->roomstart($room_id, $now);
        return $now;
    }
    
    public function end($course_id, $room_id)
    {
        $now = date('Y-m-d H:i:s');
        $course = config('livetool.course');
        $res = DB::table($course['table'])
            ->select($course['field']['starttime'].' as starttime', $course['field']['id'].' as id')
            ->where($course['field']['id'], $course_id)
            ->first();
        if ($res) {
            $num = strtotime($now) - strtotime($res->starttime);
            DB::table($course['table'])
                ->where($course['field']['id'], $res->id)
                ->update([
                    $course['field']['endtime'] => $now,
                    $course['field']['second'] => $num,
                    $course['field']['status'] => 2,
                    $course['field']['updated_at'] => $now
                ]);
            $api = new ApiServer();
            $api->roomend($room_id, $now);
        }
        return true;
    }
    
    public function type($room_id, $type)
    {
        $res = Room::find($room_id);
        $res->roomtype = $type;
        $res->save();
    }
    
    public function chat($room_id, $chat)
    {
        $res = Room::find($room_id);
        $res->roomchat = $chat;
        $res->save();
    }
    
    public function speak($room_id, $speak)
    {
        $res = Room::find($room_id);
        $res->roomspeak = $speak;
        $res->save();
    }
    
    public function hand($room_id, $hand)
    {
        $res = Room::find($room_id);
        $res->roomhand = $hand;
        $res->save();
    }
    
    public function kick($room_id, $users_id)
    {
        $res = new RoomBlack();
        $res->room_id = $room_id;
        $res->users_id = $users_id;
        $res->save();
        return true;
    }
    
    public function black($room_id, $users_id)
    {
        $res = RoomBlack::where('room_id', $room_id)
            ->where('users_id', $users_id)
            ->first();
        return $res ? true : false;
    }
}