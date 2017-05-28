
$(function(){

 var roomId;

 $.ajax({
     type: "GET",
     url: "/api/rooms",
     success: function (rooms) {
         roomId = rooms[0]._id;
         getMessages();
         $.each(rooms, function (key, room) {
             var a = '<a href="#" data-room-id="' + room._id + '" class="room list-group-item">' + room.name + '</a>';
             $('#rooms').append(a);
         });
     }
 });

 $('#add').click(function () {
     $.ajax({
         type: "POST",
         url: "/api/rooms/"+roomId+"/messages",
        data:{text:$('#message').val()},
         success: function () {
             getMessages();
            // $('#messages').val($('#messages').val()+'\r'+message);
         }
     });
 });

    $('#delete').click(function () {
        $.ajax({
            type: "DELETE",
            url: "/api/rooms/"+roomId+"/messages",
            success: function () {
                getMessages();
                // $('#messages').val($('#messages').val()+'\r'+message);
            }
        });
    });

    $("#rooms").on('click','a',function () {
        roomId=$(this).data("roomId");
        getMessages();
    })

    function getMessages() {
        $.ajax({
            type: "GET",
            url: "/api/rooms/"+roomId+"/messages",
            success: function (data) {
                $('#roomName').text("messages from "+data.roomId);
                var messages="";
               $.each(data, function (i,msg) {
                  if(msg) messages+= msg.userId+"::"+msg.text+"\r";
                });
                $('#messages').val(messages);
            }
        });
    }



});