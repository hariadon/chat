
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
             $('#message').val('');
         }
     });
 });

    $('#delete').click(function () {
        $.ajax({
            type: "DELETE",
            url: "/api/rooms/"+roomId+"/messages",
            success: function () {
                $('#messages').val('');
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
                $('#roomName').text("messages from "+data.room.name);
                var messages="";
               $.each(data.msgs, function (i,msg) {
                  if(msg) messages+= msg.username+":   "+msg.text+"\r";
                });
                $('#messages').val(messages);
            }
        });
    }



});