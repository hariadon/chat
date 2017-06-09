
$(function(){

 var roomId;

 $.get("/api/rooms", function (rooms) {
         roomId = rooms[0]._id;
         getMessages();
         $('#rooms').html($.map(rooms, room =>pretifyroom(room)));
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
                $('#messages').empty();
            }
        });
    });

    $("#rooms").on('click','a',function () {
        roomId=$(this).data("roomId");
        getMessages();
    })

    function getMessages() {
        $.getJSON("/api/rooms/"+roomId+"/messages",function (data) {
                $('#roomName').html("messages from <em>"+data.room.name+"</em>");
                var messages=$.map(data.msgs, msg=> pretifymsg(msg));
                $('#messages').html(messages);
        });
    }

//setInterval(getMessages,2000);

    function pretifymsg(msg) {
        return '<div class="media msg"><div class="media-body"><small class="pull-right time"><i class="glyphicon glyphicon-time"></i>'+msg.date.split("T")[0]+'</small> <h5 class="media-heading">'+msg.username+'</h5><small class="col-lg-10">'+msg.text+'</small></div></div><hr>';
    }
    function pretifyroom(room) {
        return '<div class="media conversation"><a href="#" data-room-id="'+room._id+'" class="pull-left"><img data-src="holder.js/64x64" alt="64x64" style="width: 50px; height: 50px;" src="" class="img-circle img-responsive"></a> <div class="media-body"> <h5 class="media-heading">'+room.name+'</h5><small>'+room.info||""+'</small> </div> </div>';
    }
});